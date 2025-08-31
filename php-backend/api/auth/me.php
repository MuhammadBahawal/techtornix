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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    session_start();
    
    // Check if admin session exists
    if (isset($_SESSION['admin_id']) && isset($_SESSION['admin_email'])) {
        // Check if session is not expired (2 hours)
        if (isset($_SESSION['login_time']) && (time() - $_SESSION['login_time']) < 7200) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'admin' => [
                    'id' => $_SESSION['admin_id'],
                    'username' => $_SESSION['admin_username'] ?? 'muhammadbahawal',
                    'email' => $_SESSION['admin_email'],
                    'role' => $_SESSION['admin_role'] ?? 'super_admin'
                ]
            ]);
        } else {
            // Session expired
            session_destroy();
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Session expired']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    }
    
} catch (Exception $e) {
    error_log("Auth check error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}
?>
