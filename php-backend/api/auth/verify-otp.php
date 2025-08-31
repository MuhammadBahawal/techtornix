<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once '../../config/database.php';
require_once '../../utils/Auth.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    $auth = new Auth($db);
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['request_id']) || !isset($input['otp'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Request ID and OTP are required']);
        exit;
    }
    
    $requestId = filter_var($input['request_id'], FILTER_SANITIZE_NUMBER_INT);
    $otp = filter_var($input['otp'], FILTER_SANITIZE_STRING);
    
    if (!$requestId || !$otp) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid request ID or OTP']);
        exit;
    }
    
    if (!preg_match('/^\d{6}$/', $otp)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'OTP must be 6 digits']);
        exit;
    }
    
    $result = $auth->verifyOTP($requestId, $otp);
    
    if ($result['success']) {
        http_response_code(200);
    } else {
        http_response_code(401);
    }
    
    echo json_encode($result);
    
} catch (Exception $e) {
    error_log("OTP verification API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}
?>
