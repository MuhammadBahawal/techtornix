<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
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
    
    switch ($method) {
        case 'GET':
            getSettings($db);
            break;
            
        case 'PUT':
            $auth->requireAuth();
            updateSettings($db, $auth);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
} catch (Exception $e) {
    error_log("Settings API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error']);
}

function getSettings($db) {
    try {
        $stmt = $db->prepare("SELECT * FROM settings ORDER BY setting_key ASC");
        $stmt->execute();
        $settings = $stmt->fetchAll();
        
        $formattedSettings = [];
        foreach ($settings as $setting) {
            $value = $setting['setting_value'];
            
            // Try to decode JSON values
            $decodedValue = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $value = $decodedValue;
            }
            
            $formattedSettings[$setting['setting_key']] = [
                'value' => $value,
                'type' => $setting['setting_type'],
                'description' => $setting['description']
            ];
        }
        
        echo json_encode([
            'success' => true,
            'data' => $formattedSettings
        ]);
        
    } catch (Exception $e) {
        error_log("Get settings error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch settings']);
    }
}

function updateSettings($db, $auth) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
            return;
        }
        
        $db->beginTransaction();
        
        foreach ($input as $key => $data) {
            $value = $data;
            
            // If it's an array or object, encode as JSON
            if (is_array($value) || is_object($value)) {
                $value = json_encode($value);
            }
            
            // Sanitize the value
            $value = htmlspecialchars($value);
            
            $stmt = $db->prepare("
                UPDATE settings 
                SET setting_value = ?, updated_at = NOW() 
                WHERE setting_key = ?
            ");
            $stmt->execute([$value, $key]);
        }
        
        $db->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Settings updated successfully'
        ]);
        
    } catch (Exception $e) {
        $db->rollBack();
        error_log("Update settings error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update settings']);
    }
}
?>
