<?php

class GeminiService {
    private $db;
    private $apiKey;
    private $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    public function __construct($database) {
        $this->db = $database;
        $this->loadApiKey();
    }
    
    private function loadApiKey() {
        try {
            $stmt = $this->db->prepare("SELECT value FROM settings WHERE setting_key = 'gemini_api_key' AND is_active = 1");
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->apiKey = $result ? $result['value'] : null;
        } catch (Exception $e) {
            error_log("Failed to load Gemini API key: " . $e->getMessage());
            $this->apiKey = null;
        }
    }
    
    public function generateResponse($message, $userId = null) {
        if (!$this->apiKey) {
            throw new Exception("Gemini API key not configured");
        }
        
        $systemPrompt = $this->getSystemPrompt();
        $fullPrompt = $systemPrompt . "\n\nUser Question: " . $message . "\n\nResponse:";
        
        $requestData = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $fullPrompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'topK' => 40,
                'topP' => 0.95,
                'maxOutputTokens' => 1024,
            ]
        ];
        
        $response = $this->makeApiRequest($requestData);
        
        // Log the API call
        $this->logApiCall($message, $response, $userId);
        
        return $response;
    }
    
    private function makeApiRequest($data) {
        $url = $this->baseUrl . '?key=' . $this->apiKey;
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception("cURL Error: " . $error);
        }
        
        if ($httpCode !== 200) {
            throw new Exception("API Error: HTTP " . $httpCode . " - " . $response);
        }
        
        $decodedResponse = json_decode($response, true);
        
        if (!$decodedResponse || !isset($decodedResponse['candidates'][0]['content']['parts'][0]['text'])) {
            throw new Exception("Invalid API response format");
        }
        
        return $decodedResponse['candidates'][0]['content']['parts'][0]['text'];
    }
    
    private function getSystemPrompt() {
        return "You are TechBot, an AI assistant for TechTornix, a leading technology company. Your role is to provide helpful, accurate, and positive information about TechTornix and technology topics.

COMPANY INFORMATION:
- Company: TechTornix
- Leadership: Muhammad Bahawal (CEO), Naveed Sarwar, Aroma Tariq (COO), Umair Arshad (CTO)
- Services: Custom software development, web applications, mobile apps, cloud solutions, AI integration, digital consulting
- Technologies: React, Node.js, Python, JavaScript, TypeScript, AI/ML, AWS, Azure, Google Cloud
- Contact: bahawal.dev@gmail.com, techtornix.com

RESPONSE GUIDELINES:
1. Always be positive, helpful, and professional
2. Focus on TechTornix services and technology topics
3. Politely redirect off-topic questions to company/tech topics
4. Use emojis appropriately to make responses engaging
5. Provide detailed, informative answers about our services
6. Encourage users to contact us for project discussions
7. Keep responses concise but comprehensive
8. Always maintain an enthusiastic tone about technology

TOPICS TO FOCUS ON:
- TechTornix company information and services
- Software development and programming
- Web development and mobile apps
- Cloud computing and deployment
- AI and machine learning
- Technology trends and best practices
- Project consultation and pricing

TOPICS TO REDIRECT:
- Weather, sports, politics, entertainment
- Personal advice, health, dating
- Non-technology related questions

Remember: You represent TechTornix, so always showcase our expertise and encourage potential clients to reach out!";
    }
    
    private function logApiCall($request, $response, $userId = null) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO gemini_logs (user_id, request_text, response_text, tokens_used, created_at) 
                VALUES (?, ?, ?, ?, NOW())
            ");
            
            $tokensUsed = strlen($request) + strlen($response); // Rough estimate
            $stmt->execute([$userId, $request, $response, $tokensUsed]);
        } catch (Exception $e) {
            error_log("Failed to log Gemini API call: " . $e->getMessage());
        }
    }
    
    public function testApiKey($testKey = null) {
        $originalKey = $this->apiKey;
        
        if ($testKey) {
            $this->apiKey = $testKey;
        }
        
        try {
            $testMessage = "Hello, respond with 'API key test successful for TechTornix'";
            $response = $this->generateResponse($testMessage);
            
            $this->apiKey = $originalKey; // Restore original key
            
            return [
                'success' => true,
                'response' => $response,
                'message' => 'API key test successful'
            ];
        } catch (Exception $e) {
            $this->apiKey = $originalKey; // Restore original key
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'message' => 'API key test failed'
            ];
        }
    }
    
    public function getFallbackResponse($message) {
        $msg = strtolower($message);
        
        if (strpos($msg, 'techtornix') !== false || strpos($msg, 'company') !== false || strpos($msg, 'about') !== false) {
            return "TechTornix is a leading technology company specializing in innovative software solutions, web development, and digital transformation. We're passionate about helping businesses leverage cutting-edge technology to achieve their goals! 🚀";
        }
        
        if (strpos($msg, 'service') !== false || strpos($msg, 'what do you do') !== false) {
            return "We offer comprehensive technology services including custom software development, web applications, mobile apps, cloud solutions, AI integration, and digital consulting. Our expert team delivers scalable, secure, and innovative solutions! 💻";
        }
        
        if (strpos($msg, 'team') !== false || strpos($msg, 'who') !== false || strpos($msg, 'founder') !== false) {
            return "Our leadership team includes Muhammad Bahawal (CEO), Naveed Sarwar, Aroma Tariq (COO), and Umair Arshad (CTO). We have a talented team of developers, designers, and technology experts committed to excellence! 👥";
        }
        
        if (strpos($msg, 'contact') !== false || strpos($msg, 'reach') !== false || strpos($msg, 'email') !== false) {
            return "You can reach us at bahawal.dev@gmail.com or visit our website at techtornix.com. We'd love to discuss how we can help with your technology needs! 📧";
        }
        
        return "I'm here to help with TechTornix services and technology topics. Please ask me about our company, services, or any tech-related questions! Feel free to contact us at bahawal.dev@gmail.com for direct assistance. 💡";
    }
}

?>
