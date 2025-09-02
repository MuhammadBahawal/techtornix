<?php

class GeminiService {
    private $db;
    private $apiKey;
    private $config;
    
    public function __construct($database = null) {
        if ($database) {
            $this->db = $database;
        } else {
            $this->initializeDatabase();
        }
        $this->loadApiKey();
        $this->loadConfiguration();
    }
    
    private function initializeDatabase() {
        $config = getDatabaseConfig();
        $this->db = new PDO(
            "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}",
            $config['username'],
            $config['password'],
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
    
    private function loadApiKey() {
        try {
            // Try to get API key from settings table
            $stmt = $this->db->prepare("SELECT setting_value FROM settings WHERE setting_key = 'gemini_api_key' AND category = 'gemini'");
            $stmt->execute();
            $apiKey = $stmt->fetchColumn();
            
            error_log("GeminiService::loadApiKey() - API key from settings: " . ($apiKey ? substr($apiKey, 0, 10) . '...' : 'null'));
            
            if ($apiKey) {
                $this->apiKey = $apiKey;
                return;
            }
            
            // Fallback: Try gemini_configs table
            $stmt = $this->db->prepare("SELECT api_key FROM gemini_configs WHERE id = 1");
            $stmt->execute();
            $fallbackKey = $stmt->fetchColumn();
            
            error_log("GeminiService::loadApiKey() - Fallback key from gemini_configs: " . ($fallbackKey ? substr($fallbackKey, 0, 10) . '...' : 'null'));
            
            if ($fallbackKey) {
                $this->apiKey = $fallbackKey;
                return;
            }
            
            // Final fallback: Use hardcoded key for testing
            $this->apiKey = 'AIzaSyCxfquOvHGJlRDrLQpUZoGHpOKNMhKrKdU';
            error_log("GeminiService::loadApiKey() - Using hardcoded fallback key");
            
        } catch (Exception $e) {
            error_log("Failed to load API key: " . $e->getMessage());
            // Use hardcoded fallback
            $this->apiKey = 'AIzaSyCxfquOvHGJlRDrLQpUZoGHpOKNMhKrKdU';
        }
    }
    
    private function loadConfiguration() {
        try {
            // Get active configuration from gemini_configs table
            $stmt = $this->db->prepare("SELECT * FROM gemini_configs WHERE is_active = 1 ORDER BY id DESC LIMIT 1");
            $stmt->execute();
            $this->config = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Set default config if none found
            if (!$this->config) {
                $this->config = [
                    'model_name' => 'gemini-pro',
                    'temperature' => 0.7,
                    'top_k' => 40,
                    'top_p' => 0.95,
                    'max_output_tokens' => 1024,
                    'system_prompt' => $this->getDefaultSystemPrompt()
                ];
            }
            
        } catch (Exception $e) {
            error_log("Failed to load Gemini configuration: " . $e->getMessage());
            // Set fallback configuration
            $this->config = [
                'model_name' => 'gemini-pro',
                'temperature' => 0.7,
                'top_k' => 40,
                'top_p' => 0.95,
                'max_output_tokens' => 1024,
                'system_prompt' => $this->getDefaultSystemPrompt()
            ];
        }
    }
    
    public function isEnabled() {
        try {
            $stmt = $this->db->prepare("SELECT setting_value FROM settings WHERE setting_key = 'gemini_enabled' AND category = 'gemini'");
            $stmt->execute();
            $enabled = $stmt->fetchColumn();
            return $enabled === '1';
        } catch (Exception $e) {
            error_log("Failed to check if Gemini is enabled: " . $e->getMessage());
            return false;
        }
    }
    
    public function sendMessage($message, $userId = null) {
        $startTime = microtime(true);
        
        if (!$this->apiKey) {
            throw new Exception("Gemini API key not configured");
        }
        
        // Prepare the prompt with system prompt
        $systemPrompt = $this->config['system_prompt'] ?? $this->getDefaultSystemPrompt();
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
                'temperature' => (float)($this->config['temperature'] ?? 0.7),
                'topK' => (int)($this->config['top_k'] ?? 40),
                'topP' => (float)($this->config['top_p'] ?? 0.95),
                'maxOutputTokens' => (int)($this->config['max_output_tokens'] ?? 1024),
            ]
        ];
        
        try {
            $response = $this->makeApiRequest($requestData);
            $endTime = microtime(true);
            $responseTime = round(($endTime - $startTime) * 1000);
            
            // Log successful request
            $this->logRequest($message, $response, $userId, 'success', null, $responseTime);
            
            return $response;
            
        } catch (Exception $e) {
            $endTime = microtime(true);
            $responseTime = round(($endTime - $startTime) * 1000);
            
            // Log failed request
            $this->logRequest($message, '', $userId, 'error', $e->getMessage(), $responseTime);
            
            throw $e;
        }
    }
    
    private function makeApiRequest($data) {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . 
               ($this->config['model_name'] ?? 'gemini-pro') . 
               ':generateContent?key=' . $this->apiKey;
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_TIMEOUT => (int)$this->getSetting('gemini_timeout', 30),
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
    
    private function logRequest($requestText, $responseText, $userId, $status, $errorMessage = null, $responseTime = 0) {
        try {
            // Check if logging is enabled
            if (!$this->getSetting('gemini_log_requests', '1')) {
                return;
            }
            
            $stmt = $this->db->prepare("
                INSERT INTO gemini_logs 
                (user_id, request_text, response_text, tokens_used, response_time_ms, status, error_message, ip_address, user_agent, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $userId,
                $requestText,
                $responseText,
                $this->estimateTokens($requestText . $responseText),
                $responseTime,
                $status,
                $errorMessage,
                $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            ]);
            
        } catch (Exception $e) {
            error_log("Failed to log Gemini request: " . $e->getMessage());
        }
    }
    
    private function estimateTokens($text) {
        // Rough estimation: 1 token ≈ 4 characters
        return ceil(strlen($text) / 4);
    }
    
    private function getSetting($key, $default = null) {
        try {
            $stmt = $this->db->prepare("SELECT setting_value FROM settings WHERE setting_key = ? AND category = 'gemini'");
            $stmt->execute([$key]);
            $value = $stmt->fetchColumn();
            return $value !== false ? $value : $default;
        } catch (Exception $e) {
            return $default;
        }
    }
    
    public function testApiKey($testKey = null) {
        $originalKey = $this->apiKey;
        
        if ($testKey) {
            $this->apiKey = $testKey;
        }
        
        try {
            $testMessage = "Hello, respond with 'API key test successful for TechTornix'";
            $response = $this->sendMessage($testMessage);
            
            $this->apiKey = $originalKey;
            
            return [
                'success' => true,
                'response' => $response,
                'message' => 'API key test successful'
            ];
        } catch (Exception $e) {
            $this->apiKey = $originalKey;
            
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
        
        if (strpos($msg, 'team') !== false || strpos($msg, 'who') !== false || strpos($msg, 'founder') !== false || strpos($msg, 'owner') !== false) {
            return "TechTornix was founded by Muhammad Bahawal (CEO), who leads our talented team including Naveed Sarwar, Aroma Tariq (COO), and Umair Arshad (CTO). We have a passionate team of developers, designers, and technology experts committed to excellence! 👥";
        }
        
        if (strpos($msg, 'contact') !== false || strpos($msg, 'reach') !== false || strpos($msg, 'email') !== false) {
            return "You can reach us at bahawal.dev@gmail.com or visit our website at techtornix.com. We'd love to discuss how we can help with your technology needs! 📧";
        }
        
        return "I'm TechTorix, your AI assistant for TechTornix! I'm here to help with our services and technology topics. Please ask me about our company, services, or any tech-related questions! Feel free to contact us at bahawal.dev@gmail.com for direct assistance. 💡";
    }
    
    private function getDefaultSystemPrompt() {
        return "You are TechTorix, an AI assistant for TechTornix, a leading technology company. Your role is to provide helpful, accurate, and positive information about TechTornix and technology topics.

COMPANY INFORMATION:
- Company: TechTornix
- Leadership: Muhammad Bahawal (CEO & Founder), Naveed Sarwar, Aroma Tariq (COO), Umair Arshad (CTO)
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

Remember: You represent TechTornix, so always showcase our expertise and encourage potential clients to reach out!";
    }
    
    // Admin methods
    public function getConfiguration() {
        return $this->config;
    }
    
    public function updateApiKey($newKey) {
        try {
            error_log("GeminiService::updateApiKey() - Updating API key: " . substr($newKey, 0, 10) . '...');
            
            $stmt = $this->db->prepare("
                INSERT INTO settings (setting_key, setting_value, setting_type, description, category, created_at, updated_at) 
                VALUES ('gemini_api_key', ?, 'text', 'Google Gemini API Key', 'gemini', NOW(), NOW()) 
                ON DUPLICATE KEY UPDATE 
                setting_value = VALUES(setting_value),
                updated_at = NOW()
            ");
            $result = $stmt->execute([$newKey]);
            
            if ($result) {
                $this->apiKey = $newKey;
                error_log("GeminiService::updateApiKey() - API key updated successfully");
                return true;
            }
            
            return false;
        } catch (Exception $e) {
            error_log("Failed to update API key: " . $e->getMessage());
            return false;
        }
    }
    
    public function updateConfiguration($configData) {
        try {
            $stmt = $this->db->prepare("
                UPDATE gemini_configs SET 
                model_name = ?, 
                temperature = ?, 
                top_k = ?, 
                top_p = ?, 
                max_output_tokens = ?, 
                system_prompt = ?,
                updated_at = CURRENT_TIMESTAMP
                WHERE is_active = 1
            ");
            
            $stmt->execute([
                $configData['model_name'] ?? $this->config['model_name'],
                $configData['temperature'] ?? $this->config['temperature'],
                $configData['top_k'] ?? $this->config['top_k'],
                $configData['top_p'] ?? $this->config['top_p'],
                $configData['max_output_tokens'] ?? $this->config['max_output_tokens'],
                $configData['system_prompt'] ?? $this->config['system_prompt']
            ]);
            
            // Reload configuration
            $this->loadConfiguration();
            return true;
        } catch (Exception $e) {
            error_log("Failed to update configuration: " . $e->getMessage());
            return false;
        }
    }
    
    public function getLogs($limit = 50, $offset = 0) {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM gemini_logs 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?
            ");
            $stmt->execute([$limit, $offset]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Failed to get logs: " . $e->getMessage());
            return [];
        }
    }
}

?>
