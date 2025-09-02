<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['message']) || empty(trim($input['message']))) {
        throw new Exception('Message is required');
    }
    
    $message = trim($input['message']);
    
    // Log the request for debugging
    error_log("Gemini Chatbot Request: Message=" . substr($message, 0, 100));
    
    // Initialize Gemini service
    $geminiService = new GeminiService();
    
    // Check if Gemini is enabled
    $isEnabled = $geminiService->isEnabled();
    error_log("Gemini Chatbot: Gemini enabled = " . ($isEnabled ? 'true' : 'false'));
    
    if (!$isEnabled) {
        // Use fallback response if Gemini is disabled
        $response = $geminiService->getFallbackResponse($message);
        
        error_log("Gemini Chatbot: Using fallback response");
        
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
        error_log("Gemini Chatbot: Attempting to send message to Gemini API");
        $response = $geminiService->sendMessage($message);
        
        error_log("Gemini Chatbot: Gemini API response received, length: " . strlen($response));
        
        echo json_encode([
            'success' => true,
            'response' => $response,
            'timestamp' => date('c'),
            'source' => 'gemini_api'
        ]);
        
    } catch (Exception $geminiError) {
        // Log the error and use fallback
        error_log("Gemini API Error: " . $geminiError->getMessage());
        
        $fallbackResponse = $geminiService->getFallbackResponse($message);
        
        error_log("Gemini Chatbot: Using fallback due to API error");
        
        echo json_encode([
            'success' => true,
            'response' => $fallbackResponse,
            'fallback' => true,
            'error' => $geminiError->getMessage(),
            'source' => 'fallback'
        ]);
    }
    
} catch (Exception $e) {
    error_log("Chatbot Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'],
            'input' => file_get_contents('php://input')
        ]
    ]);
}
?>
