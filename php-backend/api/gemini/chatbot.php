<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://techtornix.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../utils/GeminiService.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['message']) || empty(trim($input['message']))) {
        throw new Exception('Message is required');
    }
    
    $message = trim($input['message']);
    
    // Initialize Gemini service
    $geminiService = new GeminiService();
    
    // Check if Gemini is enabled
    if (!$geminiService->isEnabled()) {
        // Use fallback response if Gemini is disabled
        $response = $geminiService->getFallbackResponse($message);
        
        echo json_encode([
            'success' => true,
            'response' => $response,
            'fallback' => true,
            'message' => 'Using fallback response (Gemini disabled)'
        ]);
        exit;
    }
    
    try {
        // Send message to Gemini API
        $response = $geminiService->sendMessage($message);
        
        echo json_encode([
            'success' => true,
            'response' => $response,
            'timestamp' => date('c')
        ]);
        
    } catch (Exception $geminiError) {
        // Log the error and use fallback
        error_log("Gemini API Error: " . $geminiError->getMessage());
        
        $fallbackResponse = $geminiService->getFallbackResponse($message);
        
        echo json_encode([
            'success' => true,
            'response' => $fallbackResponse,
            'fallback' => true,
            'error' => $geminiError->getMessage()
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
