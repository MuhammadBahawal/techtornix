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
                getCategory($db, $id);
            } else {
                getCategories($db);
            }
            break;
            
        case 'POST':
            $auth->requireAuth();
            createCategory($db, $auth);
            break;
            
        case 'PUT':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Category ID is required']);
                exit;
            }
            updateCategory($db, $auth, $id);
            break;
            
        case 'DELETE':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Category ID is required']);
                exit;
            }
            deleteCategory($db, $id);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    error_log("Categories API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}

function getCategories($db) {
    try {
        $status = isset($_GET['status']) ? $_GET['status'] : 'active';
        $withProducts = isset($_GET['with_products']) ? $_GET['with_products'] === 'true' : false;
        
        $whereClause = $status !== 'all' ? 'WHERE status = ?' : '';
        $params = $status !== 'all' ? [$status] : [];
        
        $sql = "SELECT * FROM categories $whereClause ORDER BY sort_order ASC, name ASC";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $categories = $stmt->fetchAll();
        
        if ($withProducts) {
            foreach ($categories as &$category) {
                $productStmt = $db->prepare("SELECT COUNT(*) as count FROM products WHERE category_id = ? AND status = 'active'");
                $productStmt->execute([$category['id']]);
                $category['product_count'] = intval($productStmt->fetch()['count']);
            }
        }
        
        echo json_encode([
            'success' => true,
            'data' => $categories
        ]);
        
    } catch (Exception $e) {
        error_log("Get categories error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch categories']);
    }
}

function getCategory($db, $id) {
    try {
        $stmt = $db->prepare("SELECT * FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch();
        
        if (!$category) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            return;
        }
        
        // Get product count
        $productStmt = $db->prepare("SELECT COUNT(*) as count FROM products WHERE category_id = ? AND status = 'active'");
        $productStmt->execute([$id]);
        $category['product_count'] = intval($productStmt->fetch()['count']);
        
        echo json_encode([
            'success' => true,
            'data' => $category
        ]);
        
    } catch (Exception $e) {
        error_log("Get category error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch category']);
    }
}

function createCategory($db, $auth) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        if (!isset($input['name']) || empty(trim($input['name']))) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Category name is required']);
            return;
        }
        
        $name = htmlspecialchars(trim($input['name']));
        $slug = generateSlug($name);
        $description = isset($input['description']) ? htmlspecialchars(trim($input['description'])) : '';
        $image = isset($input['image']) ? htmlspecialchars(trim($input['image'])) : '';
        $status = isset($input['status']) ? $input['status'] : 'active';
        $sortOrder = isset($input['sort_order']) ? intval($input['sort_order']) : 0;
        $metaTitle = isset($input['meta_title']) ? htmlspecialchars(trim($input['meta_title'])) : $name;
        $metaDescription = isset($input['meta_description']) ? htmlspecialchars(trim($input['meta_description'])) : $description;
        
        // Check if slug already exists
        $slugStmt = $db->prepare("SELECT id FROM categories WHERE slug = ?");
        $slugStmt->execute([$slug]);
        if ($slugStmt->fetch()) {
            $slug = $slug . '-' . time();
        }
        
        $sql = "
            INSERT INTO categories (name, slug, description, image, status, sort_order, meta_title, meta_description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([$name, $slug, $description, $image, $status, $sortOrder, $metaTitle, $metaDescription]);
        
        $categoryId = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Category created successfully',
            'data' => ['id' => $categoryId]
        ]);
        
    } catch (Exception $e) {
        error_log("Create category error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create category']);
    }
}

function updateCategory($db, $auth, $id) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        // Check if category exists
        $checkStmt = $db->prepare("SELECT id FROM categories WHERE id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            return;
        }
        
        $updateFields = [];
        $params = [];
        
        $allowedFields = ['name', 'description', 'image', 'status', 'sort_order', 'meta_title', 'meta_description'];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if (in_array($field, ['name', 'description', 'image', 'meta_title', 'meta_description'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = htmlspecialchars(trim($input[$field]));
                    
                    if ($field === 'name') {
                        $updateFields[] = "slug = ?";
                        $params[] = generateSlug($input[$field]);
                    }
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
        
        $sql = "UPDATE categories SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        echo json_encode([
            'success' => true,
            'message' => 'Category updated successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Update category error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update category']);
    }
}

function deleteCategory($db, $id) {
    try {
        // Check if category has products
        $productStmt = $db->prepare("SELECT COUNT(*) as count FROM products WHERE category_id = ?");
        $productStmt->execute([$id]);
        $productCount = intval($productStmt->fetch()['count']);
        
        if ($productCount > 0) {
            http_response_code(400);
            echo json_encode([
                'success' => false, 
                'message' => 'Cannot delete category with existing products. Please move or delete products first.'
            ]);
            return;
        }
        
        $stmt = $db->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Delete category error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete category']);
    }
}

function generateSlug($text) {
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}
?>
