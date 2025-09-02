<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://techtornix.com');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Basic health check endpoint
if ($_SERVER['REQUEST_URI'] === '/php-backend/' || $_SERVER['REQUEST_URI'] === '/php-backend/index.php') {
    echo json_encode([
        'success' => true,
        'message' => 'Techtornix PHP Backend API',
        'version' => '1.0.0',
        'timestamp' => date('Y-m-d H:i:s'),
        'endpoints' => [
            'auth' => [
                'POST /api/auth/login' => 'Admin login with OTP',
                'POST /api/auth/verify-otp' => 'Verify OTP code',
                'POST /api/auth/logout' => 'Logout admin',
                'GET /api/auth/me' => 'Get current admin info'
            ],
            'products' => [
                'GET /api/products' => 'Get all products',
                'GET /api/products/{id}' => 'Get single product',
                'POST /api/products' => 'Create product (auth required)',
                'PUT /api/products/{id}' => 'Update product (auth required)',
                'DELETE /api/products/{id}' => 'Delete product (auth required)'
            ],
            'categories' => [
                'GET /api/categories' => 'Get all categories',
                'GET /api/categories/{id}' => 'Get single category',
                'POST /api/categories' => 'Create category (auth required)',
                'PUT /api/categories/{id}' => 'Update category (auth required)',
                'DELETE /api/categories/{id}' => 'Delete category (auth required)'
            ],
            'blogs' => [
                'GET /api/blogs' => 'Get all blogs',
                'GET /api/blogs/{id}' => 'Get single blog',
                'POST /api/blogs' => 'Create blog (auth required)',
                'PUT /api/blogs/{id}' => 'Update blog (auth required)',
                'DELETE /api/blogs/{id}' => 'Delete blog (auth required)'
            ],
            'testimonials' => [
                'GET /api/testimonials' => 'Get all testimonials',
                'GET /api/testimonials/{id}' => 'Get single testimonial',
                'POST /api/testimonials' => 'Create testimonial (auth required)',
                'PUT /api/testimonials/{id}' => 'Update testimonial (auth required)',
                'DELETE /api/testimonials/{id}' => 'Delete testimonial (auth required)'
            ],
            'settings' => [
                'GET /api/settings' => 'Get all settings',
                'PUT /api/settings' => 'Update settings (auth required)'
            ],
            'gemini' => [
                'POST /api/gemini/chatbot' => 'Gemini chatbot endpoint',
                'POST /api/gemini/admin' => 'Gemini admin endpoint'
            ]
        ]
    ]);
    exit;
}

// Simple routing for API endpoints
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));

// Remove 'php-backend' from path if present
if (isset($pathParts[0]) && $pathParts[0] === 'php-backend') {
    array_shift($pathParts);
}

if (isset($pathParts[0]) && $pathParts[0] === 'api' && isset($pathParts[1])) {
    $endpoint = $pathParts[1];
    
    switch ($endpoint) {
        case 'auth':
            if (isset($pathParts[2])) {
                $action = $pathParts[2];
                switch ($action) {
                    case 'login':
                        require_once 'api/auth/login.php';
                        break;
                    case 'verify-otp':
                        require_once 'api/auth/verify-otp.php';
                        break;
                    case 'logout':
                        require_once 'api/auth/logout.php';
                        break;
                    case 'me':
                        require_once 'api/auth/me.php';
                        break;
                    default:
                        http_response_code(404);
                        echo json_encode(['success' => false, 'message' => 'Auth endpoint not found']);
                }
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Auth action required']);
            }
            break;
            
        case 'products':
            require_once 'api/products/index.php';
            break;
            
        case 'categories':
            require_once 'api/categories/index.php';
            break;
            
        case 'blogs':
            require_once 'api/blogs/index.php';
            break;
            
        case 'testimonials':
            require_once 'api/testimonials/index.php';
            break;
            
        case 'settings':
            require_once 'api/settings/index.php';
            break;
            
        case 'gemini':
            if (isset($pathParts[2])) {
                $action = $pathParts[2];
                switch ($action) {
                    case 'chatbot':
                        require_once 'api/gemini/chatbot.php';
                        break;
                    case 'admin':
                        require_once 'api/gemini/admin.php';
                        break;
                    default:
                        http_response_code(404);
                        echo json_encode(['success' => false, 'message' => 'Gemini endpoint not found']);
                }
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Gemini action required']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'API endpoint not found']);
    }
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Invalid API path']);
}
?>
