<?php
header('Content-Type: application/json');

// Dynamic CORS based on environment
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost',
    'https://techtornix.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://techtornix.com');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Max-Age: 86400'); // 24 hours
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
                getBlog($db, $id);
            } else {
                getBlogs($db);
            }
            break;
            
        case 'POST':
            $auth->requireAuth();
            createBlog($db, $auth);
            break;
            
        case 'PUT':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Blog ID is required']);
                exit;
            }
            updateBlog($db, $auth, $id);
            break;
            
        case 'DELETE':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Blog ID is required']);
                exit;
            }
            deleteBlog($db, $id);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    error_log("Blogs API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}

function getBlogs($db) {
    try {
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 10;
        $offset = ($page - 1) * $limit;
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        $status = isset($_GET['status']) ? $_GET['status'] : 'published';
        $category = isset($_GET['category']) ? trim($_GET['category']) : '';
        
        $whereConditions = [];
        $params = [];
        
        if ($status !== 'all') {
            $whereConditions[] = "status = ?";
            $params[] = $status;
        }
        
        if ($search) {
            $whereConditions[] = "(title LIKE ? OR content LIKE ? OR excerpt LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if ($category) {
            $whereConditions[] = "category = ?";
            $params[] = $category;
        }
        
        $whereClause = $whereConditions ? 'WHERE ' . implode(' AND ', $whereConditions) : '';
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM blogs $whereClause";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch()['total'];
        
        // Get blogs
        $sql = "
            SELECT * FROM blogs 
            $whereClause
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        ";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $blogs = $stmt->fetchAll();
        
        // Process tags
        foreach ($blogs as &$blog) {
            $blog['tags'] = $blog['tags'] ? json_decode($blog['tags'], true) : [];
        }
        
        echo json_encode([
            'success' => true,
            'data' => $blogs,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => intval($total),
                'pages' => ceil($total / $limit)
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Get blogs error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch blogs']);
    }
}

function getBlog($db, $id) {
    try {
        $stmt = $db->prepare("SELECT * FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        $blog = $stmt->fetch();
        
        if (!$blog) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found']);
            return;
        }
        
        $blog['tags'] = $blog['tags'] ? json_decode($blog['tags'], true) : [];
        
        // Increment views if published
        if ($blog['status'] === 'published') {
            $updateViewsStmt = $db->prepare("UPDATE blogs SET views = views + 1 WHERE id = ?");
            $updateViewsStmt->execute([$id]);
            $blog['views'] = intval($blog['views']) + 1;
        }
        
        echo json_encode([
            'success' => true,
            'data' => $blog
        ]);
        
    } catch (Exception $e) {
        error_log("Get blog error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch blog']);
    }
}

function createBlog($db, $auth) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        $required = ['title', 'content'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty(trim($input[$field]))) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
                return;
            }
        }
        
        $admin = $auth->getCurrentAdmin();
        $title = htmlspecialchars(trim($input['title']));
        $slug = generateSlug($title);
        $content = htmlspecialchars(trim($input['content']));
        $excerpt = isset($input['excerpt']) ? htmlspecialchars(trim($input['excerpt'])) : '';
        $featuredImage = isset($input['featured_image']) ? htmlspecialchars(trim($input['featured_image'])) : '';
        $category = isset($input['category']) ? htmlspecialchars(trim($input['category'])) : '';
        $tags = isset($input['tags']) ? json_encode($input['tags']) : json_encode([]);
        $status = isset($input['status']) ? $input['status'] : 'draft';
        $isFeatured = isset($input['is_featured']) ? intval($input['is_featured']) : 0;
        $metaTitle = isset($input['meta_title']) ? htmlspecialchars(trim($input['meta_title'])) : $title;
        $metaDescription = isset($input['meta_description']) ? htmlspecialchars(trim($input['meta_description'])) : $excerpt;
        $publishedAt = $status === 'published' ? date('Y-m-d H:i:s') : null;
        
        // Check if slug already exists
        $slugStmt = $db->prepare("SELECT id FROM blogs WHERE slug = ?");
        $slugStmt->execute([$slug]);
        if ($slugStmt->fetch()) {
            $slug = $slug . '-' . time();
        }
        
        $sql = "
            INSERT INTO blogs (
                title, slug, content, excerpt, featured_image, category, tags, status,
                is_featured, meta_title, meta_description, author_id, published_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([
            $title, $slug, $content, $excerpt, $featuredImage, $category, $tags, $status,
            $isFeatured, $metaTitle, $metaDescription, $admin['id'], $publishedAt
        ]);
        
        $blogId = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Blog created successfully',
            'data' => ['id' => $blogId]
        ]);
        
    } catch (Exception $e) {
        error_log("Create blog error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create blog']);
    }
}

function updateBlog($db, $auth, $id) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        // Check if blog exists
        $checkStmt = $db->prepare("SELECT id, status FROM blogs WHERE id = ?");
        $checkStmt->execute([$id]);
        $existingBlog = $checkStmt->fetch();
        
        if (!$existingBlog) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found']);
            return;
        }
        
        $updateFields = [];
        $params = [];
        
        $allowedFields = [
            'title', 'content', 'excerpt', 'featured_image', 'category', 'tags', 'status',
            'is_featured', 'meta_title', 'meta_description'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if ($field === 'tags') {
                    $updateFields[] = "$field = ?";
                    $params[] = json_encode($input[$field]);
                } elseif (in_array($field, ['title', 'content', 'excerpt', 'featured_image', 'category', 'meta_title', 'meta_description'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = htmlspecialchars(trim($input[$field]));
                    
                    if ($field === 'title') {
                        $updateFields[] = "slug = ?";
                        $params[] = generateSlug($input[$field]);
                    }
                } else {
                    $updateFields[] = "$field = ?";
                    $params[] = $input[$field];
                }
            }
        }
        
        // Handle published_at when status changes to published
        if (isset($input['status']) && $input['status'] === 'published' && $existingBlog['status'] !== 'published') {
            $updateFields[] = "published_at = NOW()";
        }
        
        if (empty($updateFields)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'No valid fields to update']);
            return;
        }
        
        $updateFields[] = "updated_at = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE blogs SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        echo json_encode([
            'success' => true,
            'message' => 'Blog updated successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Update blog error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update blog']);
    }
}

function deleteBlog($db, $id) {
    try {
        $stmt = $db->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Blog not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Blog deleted successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Delete blog error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete blog']);
    }
}

function generateSlug($text) {
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}
?>
