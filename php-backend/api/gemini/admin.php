<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Add error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../../config/database.php';
require_once '../../utils/GeminiService.php';

try {
    $geminiService = new GeminiService();
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? null;
    
    // Log the request for debugging
    error_log("Gemini Admin Request: Method=$method, Action=$action");
    
    if ($method === 'GET') {
        switch ($action) {
            case 'status':
                // Get current configuration and status
                $config = $geminiService->getConfiguration();
                $isEnabled = $geminiService->isEnabled();
                
                // Get API key status from settings
                $dbConfig = getDatabaseConfig();
                $db = new PDO(
                    "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}",
                    $dbConfig['username'],
                    $dbConfig['password'],
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
                
                $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = 'gemini_api_key' AND category = 'gemini'");
                $stmt->execute();
                $apiKey = $stmt->fetchColumn();
                
                echo json_encode([
                    'success' => true,
                    'data' => [
                        'api_key' => $apiKey ? substr($apiKey, 0, 10) . '...' : 'AIzaSyCxfqu...',
                        'enabled' => $isEnabled,
                        'status' => $apiKey ? 'configured' : 'using_fallback',
                        'config' => [
                            'model_name' => $config['model_name'] ?? 'gemini-pro',
                            'temperature' => (float)($config['temperature'] ?? 0.7),
                            'top_k' => (int)($config['top_k'] ?? 40),
                            'top_p' => (float)($config['top_p'] ?? 0.95),
                            'max_output_tokens' => (int)($config['max_output_tokens'] ?? 1024),
                            'system_prompt' => $config['system_prompt'] ?? ''
                        ]
                    ]
                ]);
                break;
                
            case 'logs':
                // Get API logs
                $limit = (int)($_GET['limit'] ?? 50);
                $offset = (int)($_GET['offset'] ?? 0);
                $logs = $geminiService->getLogs($limit, $offset);
                
                echo json_encode([
                    'success' => true,
                    'data' => $logs
                ]);
                break;
                
            case 'config':
                // Get current active configuration
                $config = $geminiService->getConfiguration();
                echo json_encode([
                    'success' => true,
                    'data' => $config
                ]);
                break;
                
            default:
                throw new Exception('Invalid action: ' . $action);
        }
    } elseif ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $action = $input['action'] ?? null;
        
        error_log("Gemini Admin POST: Action=$action, Input=" . json_encode($input));
        
        switch ($action) {
            case 'update_key':
                $apiKey = $input['api_key'] ?? null;
                if (!$apiKey) {
                    throw new Exception('API key is required');
                }
                
                error_log("Admin API - update_key: " . substr($apiKey, 0, 10) . '...');
                
                $success = $geminiService->updateApiKey($apiKey);
                if ($success) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'API key updated successfully'
                    ]);
                } else {
                    throw new Exception('Failed to update API key in database');
                }
                break;
                
            case 'test_key':
                $apiKey = $input['api_key'] ?? null;
                
                error_log("Admin API - test_key: " . ($apiKey ? substr($apiKey, 0, 10) . '...' : 'using current key'));
                
                $result = $geminiService->testApiKey($apiKey);
                
                error_log("Admin API - test_key result: " . json_encode($result));
                
                echo json_encode($result);
                break;
                
            case 'update_settings':
                $enabled = isset($input['enabled']) ? ($input['enabled'] ? '1' : '0') : null;
                
                if ($enabled !== null) {
                    $dbConfig = getDatabaseConfig();
                    $db = new PDO(
                        "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}",
                        $dbConfig['username'],
                        $dbConfig['password'],
                        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                    );
                    
                    $stmt = $db->prepare("
                        INSERT INTO settings (setting_key, setting_value, setting_type, description, category) 
                        VALUES ('gemini_enabled', ?, 'text', 'Enable/Disable Gemini API', 'gemini') 
                        ON DUPLICATE KEY UPDATE 
                        setting_value = VALUES(setting_value),
                        updated_at = CURRENT_TIMESTAMP
                    ");
                    $stmt->execute([$enabled]);
                }
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Settings updated successfully'
                ]);
                break;
                
            case 'update_config':
                $configData = $input['config'] ?? [];
                $success = $geminiService->updateConfiguration($configData);
                
                if ($success) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'Configuration updated successfully'
                    ]);
                } else {
                    throw new Exception('Failed to update configuration');
                }
                break;
                
            case 'test_message':
                $testMessage = $input['message'] ?? 'Hello, this is a test message from TechTornix admin panel.';
                
                try {
                    $response = $geminiService->sendMessage($testMessage);
                    echo json_encode([
                        'success' => true,
                        'response' => $response,
                        'message' => 'Test message sent successfully'
                    ]);
                } catch (Exception $e) {
                    echo json_encode([
                        'success' => false,
                        'error' => $e->getMessage(),
                        'fallback_response' => $geminiService->getFallbackResponse($testMessage)
                    ]);
                }
                break;
                
            default:
                throw new Exception('Invalid action: ' . $action);
        }
    } else {
        throw new Exception('Method not allowed: ' . $method);
    }
    
} catch (Exception $e) {
    error_log("Gemini Admin Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'],
            'action' => $_GET['action'] ?? 'none',
            'input' => file_get_contents('php://input')
        ]
    ]);
}
?>
