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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['email']) || !isset($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    $email = trim($input['email']);
    $password = $input['password'];
    
    // Simple credential verification
    if ($email === 'bahawal.dev@gmail.com' && $password === 'Bahawal@6432') {
        // Start session
        session_start();
        $_SESSION['admin_id'] = 1;
        $_SESSION['admin_email'] = $email;
        $_SESSION['admin_username'] = 'muhammadbahawal';
        $_SESSION['admin_role'] = 'super_admin';
        $_SESSION['login_time'] = time();
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'admin' => [
                'id' => 1,
                'username' => 'muhammadbahawal',
                'email' => $email,
                'role' => 'super_admin'
            ],
            'token' => 'admin-token-' . time()
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'message' => 'Invalid credentials. Please check your email and password.'
        ]);
    }
    
} catch (Exception $e) {
    error_log("Login API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}
?>
