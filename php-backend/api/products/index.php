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
                getProduct($db, $id);
            } else {
                getProducts($db);
            }
            break;
            
        case 'POST':
            $auth->requireAuth();
            createProduct($db, $auth);
            break;
            
        case 'PUT':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Product ID is required']);
                exit;
            }
            updateProduct($db, $auth, $id);
            break;
            
        case 'DELETE':
            $auth->requireAuth();
            if (!$id) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Product ID is required']);
                exit;
            }
            deleteProduct($db, $id);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    error_log("Products API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}

function getProducts($db) {
    try {
        $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
        $limit = isset($_GET['limit']) ? min(100, max(1, intval($_GET['limit']))) : 10;
        $offset = ($page - 1) * $limit;
        $category = isset($_GET['category']) ? intval($_GET['category']) : null;
        $search = isset($_GET['search']) ? trim($_GET['search']) : '';
        $status = isset($_GET['status']) ? $_GET['status'] : 'active';
        
        $whereConditions = [];
        $params = [];
        
        if ($status !== 'all') {
            $whereConditions[] = "p.status = ?";
            $params[] = $status;
        }
        
        if ($category) {
            $whereConditions[] = "p.category_id = ?";
            $params[] = $category;
        }
        
        if ($search) {
            $whereConditions[] = "(p.name LIKE ? OR p.description LIKE ? OR p.short_description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        $whereClause = $whereConditions ? 'WHERE ' . implode(' AND ', $whereConditions) : '';
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM products p $whereClause";
        $countStmt = $db->prepare($countSql);
        $countStmt->execute($params);
        $total = $countStmt->fetch()['total'];
        
        // Get products with category info
        $sql = "
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            $whereClause
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        ";
        
        $params[] = $limit;
        $params[] = $offset;
        
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll();
        
        // Process images
        foreach ($products as &$product) {
            $product['images'] = $product['images'] ? json_decode($product['images'], true) : [];
            $product['features'] = $product['features'] ? json_decode($product['features'], true) : [];
            $product['specifications'] = $product['specifications'] ? json_decode($product['specifications'], true) : [];
        }
        
        echo json_encode([
            'success' => true,
            'data' => $products,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => intval($total),
                'pages' => ceil($total / $limit)
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Get products error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch products']);
    }
}

function getProduct($db, $id) {
    try {
        $stmt = $db->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        ");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        
        if (!$product) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Product not found']);
            return;
        }
        
        $product['images'] = $product['images'] ? json_decode($product['images'], true) : [];
        $product['features'] = $product['features'] ? json_decode($product['features'], true) : [];
        $product['specifications'] = $product['specifications'] ? json_decode($product['specifications'], true) : [];
        
        echo json_encode([
            'success' => true,
            'data' => $product
        ]);
        
    } catch (Exception $e) {
        error_log("Get product error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch product']);
    }
}

function createProduct($db, $auth) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        $required = ['name', 'category_id', 'price'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
                return;
            }
        }
        
        $name = htmlspecialchars(trim($input['name']));
        $slug = generateSlug($name);
        $categoryId = intval($input['category_id']);
        $price = floatval($input['price']);
        $salePrice = isset($input['sale_price']) ? floatval($input['sale_price']) : null;
        $shortDescription = isset($input['short_description']) ? htmlspecialchars(trim($input['short_description'])) : '';
        $description = isset($input['description']) ? htmlspecialchars(trim($input['description'])) : '';
        $images = isset($input['images']) ? json_encode($input['images']) : json_encode([]);
        $features = isset($input['features']) ? json_encode($input['features']) : json_encode([]);
        $specifications = isset($input['specifications']) ? json_encode($input['specifications']) : json_encode([]);
        $stock = isset($input['stock']) ? intval($input['stock']) : 0;
        $sku = isset($input['sku']) ? htmlspecialchars(trim($input['sku'])) : '';
        $status = isset($input['status']) ? $input['status'] : 'active';
        $isFeatured = isset($input['is_featured']) ? intval($input['is_featured']) : 0;
        $metaTitle = isset($input['meta_title']) ? htmlspecialchars(trim($input['meta_title'])) : $name;
        $metaDescription = isset($input['meta_description']) ? htmlspecialchars(trim($input['meta_description'])) : $shortDescription;
        
        // Check if category exists
        $categoryStmt = $db->prepare("SELECT id FROM categories WHERE id = ?");
        $categoryStmt->execute([$categoryId]);
        if (!$categoryStmt->fetch()) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid category']);
            return;
        }
        
        $sql = "
            INSERT INTO products (
                name, slug, category_id, price, sale_price, short_description, description,
                images, features, specifications, stock, sku, status, is_featured,
                meta_title, meta_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ";
        
        $stmt = $db->prepare($sql);
        $stmt->execute([
            $name, $slug, $categoryId, $price, $salePrice, $shortDescription, $description,
            $images, $features, $specifications, $stock, $sku, $status, $isFeatured,
            $metaTitle, $metaDescription
        ]);
        
        $productId = $db->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => ['id' => $productId]
        ]);
        
    } catch (Exception $e) {
        error_log("Create product error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to create product']);
    }
}

function updateProduct($db, $auth, $id) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        // Check if product exists
        $checkStmt = $db->prepare("SELECT id FROM products WHERE id = ?");
        $checkStmt->execute([$id]);
        if (!$checkStmt->fetch()) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Product not found']);
            return;
        }
        
        $updateFields = [];
        $params = [];
        
        $allowedFields = [
            'name', 'category_id', 'price', 'sale_price', 'short_description', 'description',
            'images', 'features', 'specifications', 'stock', 'sku', 'status', 'is_featured',
            'meta_title', 'meta_description'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if (in_array($field, ['images', 'features', 'specifications'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = json_encode($input[$field]);
                } elseif (in_array($field, ['name', 'short_description', 'description', 'sku', 'meta_title', 'meta_description'])) {
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
        
        $sql = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        
        echo json_encode([
            'success' => true,
            'message' => 'Product updated successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Update product error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update product']);
    }
}

function deleteProduct($db, $id) {
    try {
        $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Product not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
        
    } catch (Exception $e) {
        error_log("Delete product error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete product']);
    }
}

function generateSlug($text) {
    $text = strtolower($text);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}
?>
