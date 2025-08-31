<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../utils/Auth.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);
    
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $pathParts = explode('/', trim($path, '/'));
    $id = isset($pathParts[3]) ? intval($pathParts[3]) : null;
    
    switch ($method) {
        case 'GET':
            if ($id) {
                getTestimonial($db, $id);
            } else {
                getTestimonials($db);
            }
            break;
            
        case 'POST':
            $auth->requireAuth();
            createTestimonial($db, $auth);
            break;
            
        case 'PUT':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Testimonial ID is required']);
                exit;
            }
            updateTestimonial($db, $auth, $id);
            break;
            
        case 'DELETE':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Testimonial ID is required']);
                exit;
            }
            deleteTestimonial($db, $id);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    error_log("Testimonials API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}

function getTestimonials($db) {
    try {
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 10;
        $offset = ($page - 1) * $limit;
        $status = isset($_GET['status']) ? $_GET['status'] : 'active';
        $featured = isset($_GET['featured']) ? $_GET['featured'] === 'true' : null;
        
        $whereConditions = [];
        $params = [];
        
        if ($status !== 'all') {
            $whereConditions[] = "status = ?";
            $params[] = $status;
        }
        
        if ($featured !== null) {
            $whereConditions[] = "is_featured = ?";
            $params[] = $featured ? 1 : 0;
        }
        
        $whereClause = $whereConditions ? 'WHERE ' . implode(' AND ', $whereConditions) : '';
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM testimonials $whereClause";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch()['total'];
        
        // Get testimonials
        $sql = "
            SELECT * FROM testimonials 
            $whereClause
            ORDER BY is_featured DESC, created_at DESC
            LIMIT ? OFFSET ?
        ";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $testimonials = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'data' => $testimonials,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => intval($total),
                'pages' => ceil($total / $limit)
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Get testimonials error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch testimonials']);
    }
}

function getTestimonial($db, $id) {
    try {
        $stmt = $db->prepare("SELECT * FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        $testimonial = $stmt->fetch();
        
        if (!$testimonial) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Testimonial not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $testimonial
        ]);
        
    } catch (Exception $e) {
        error_log("Get testimonial error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch testimonial']);
    }
}

function createTestimonial($db, $auth) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        $required = ['client_name', 'content'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty(trim($input[$field]))) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => ucfirst(str_replace('_', ' ', $field)) . ' is required']);
                return;
            }
        }
        
        $clientName = htmlspecialchars(trim($input['client_name']));
        $content = htmlspecialchars(trim($input['content']));
        $company = isset($input['company']) ? htmlspecialchars(trim($input['company'])) : '';
        $position = isset($input['position']) ? htmlspecialchars(trim($input['position'])) : '';
        $avatar = isset($input['avatar']) ? htmlspecialchars(trim($input['avatar'])) : '';
        $rating = isset($input['rating']) ? max(1, min(5, intval($input['rating']))) : 5;
        $status = isset($input['status']) ? $input['status'] : 'active';
        $isFeatured = isset($input['is_featured']) ? intval($input['is_featured']) : 0;
        
        $sql = "
            INSERT INTO testimonials (client_name, content, company, position, avatar, rating, status, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([$clientName, $content, $company, $position, $avatar, $rating, $status, $isFeatured]);
        
        $testimonialId = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Testimonial created successfully',
            'data' => ['id' => $testimonialId]
        ]);
        
    } catch (Exception $e) {
        error_log("Create testimonial error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create testimonial']);
    }
}

function updateTestimonial($db, $auth, $id) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        // Check if testimonial exists
        $checkStmt = $db->prepare("SELECT id FROM testimonials WHERE id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Testimonial not found']);
            return;
        }
        
        $updateFields = [];
        $params = [];
        
        $allowedFields = ['client_name', 'content', 'company', 'position', 'avatar', 'rating', 'status', 'is_featured'];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if (in_array($field, ['client_name', 'content', 'company', 'position', 'avatar'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = htmlspecialchars(trim($input[$field]));
                } elseif ($field === 'rating') {
                    $updateFields[] = "$field = ?";
                    $params[] = max(1, min(5, intval($input[$field])));
                } else {
                    $updateFields[] = "$field = ?";
                    $params[] = $input[$field];
                }
            }
        }
        
        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No valid fields to update']);
            return;
        }
        
        $updateFields[] = "updated_at = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE testimonials SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        echo json_encode([
            'success' => true,
            'message' => 'Testimonial updated successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Update testimonial error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update testimonial']);
    }
}

function deleteTestimonial($db, $id) {
    try {
        $stmt = $db->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Testimonial not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Testimonial deleted successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Delete testimonial error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete testimonial']);
    }
}
?>
