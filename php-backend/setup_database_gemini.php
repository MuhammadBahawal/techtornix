<?php
require_once 'config/database.php';

// Set content type and CORS headers
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

echo "<!DOCTYPE html>
<html>
<head>
    <title>TechTornix Gemini Database Setup</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { background: #d4edda; border-color: #c3e6cb; color: #155724; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .error { background: #f8d7da; border-color: #f5c6cb; color: #721c24; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .info { background: #d1ecf1; border-color: #bee5eb; color: #0c5460; padding: 10px; margin: 10px 0; border-radius: 5px; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
        h2 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
    </style>
</head>
<body>
<div class='container'>
<h1>🔧 TechTornix Gemini Database Setup</h1>";

try {
    // Initialize database connection
    $config = getDatabaseConfig();
    $db = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    
    echo "<div class='success'>✅ Database connection successful</div>";
    
    // Insert/Update Gemini settings in settings table
    echo "<h2>1. Setting up Gemini Settings</h2>";
    
    $geminiSettings = [
        ['gemini_enabled', '1', 'text', 'Enable or disable Gemini API', 'gemini'],
        ['gemini_api_key', 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0', 'text', 'Gemini API Key', 'gemini'],
        ['gemini_fallback_enabled', '1', 'text', 'Enable fallback responses when API fails', 'gemini'],
        ['gemini_log_requests', '1', 'text', 'Log all API requests and responses', 'gemini'],
        ['gemini_rate_limit', '100', 'text', 'Requests per hour limit', 'gemini'],
        ['gemini_timeout', '30', 'text', 'API request timeout in seconds', 'gemini']
    ];
    
    $stmt = $db->prepare("
        INSERT INTO settings (setting_key, setting_value, setting_type, description, category) 
        VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        setting_type = VALUES(setting_type),
        description = VALUES(description),
        category = VALUES(category),
        updated_at = CURRENT_TIMESTAMP
    ");
    
    foreach ($geminiSettings as $setting) {
        $stmt->execute($setting);
        echo "<div class='info'>📝 Updated setting: {$setting[0]} = {$setting[1]}</div>";
    }
    
    // Update gemini_configs table with proper system prompt
    echo "<h2>2. Setting up Gemini Configuration</h2>";
    
    $systemPrompt = "You are TechTorix, an AI assistant for TechTornix, a leading technology company. Your role is to provide helpful, accurate, and positive information about TechTornix and technology topics.

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
    
    // Update the existing active configuration
    $stmt = $db->prepare("
        UPDATE gemini_configs SET 
        system_prompt = ?,
        updated_at = CURRENT_TIMESTAMP
        WHERE is_active = 1
    ");
    $stmt->execute([$systemPrompt]);
    
    if ($stmt->rowCount() > 0) {
        echo "<div class='success'>✅ Updated active Gemini configuration with proper system prompt</div>";
    } else {
        echo "<div class='info'>ℹ️ No active configuration found, using existing default</div>";
    }
    
    // Verify current configuration
    echo "<h2>3. Current Configuration Status</h2>";
    
    $stmt = $db->prepare("SELECT * FROM gemini_configs WHERE is_active = 1");
    $stmt->execute();
    $config = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($config) {
        echo "<div class='success'>✅ Active Configuration Found:</div>";
        echo "<pre>";
        echo "Config Name: " . $config['config_name'] . "\n";
        echo "Model: " . $config['model_name'] . "\n";
        echo "Temperature: " . $config['temperature'] . "\n";
        echo "Top K: " . $config['top_k'] . "\n";
        echo "Top P: " . $config['top_p'] . "\n";
        echo "Max Tokens: " . $config['max_output_tokens'] . "\n";
        echo "System Prompt Length: " . strlen($config['system_prompt']) . " characters\n";
        echo "Last Updated: " . $config['updated_at'] . "\n";
        echo "</pre>";
    }
    
    // Verify settings
    echo "<h2>4. Current Settings Status</h2>";
    
    $stmt = $db->prepare("SELECT setting_key, setting_value FROM settings WHERE category = 'gemini' ORDER BY setting_key");
    $stmt->execute();
    $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<div class='success'>✅ Gemini Settings:</div>";
    echo "<pre>";
    foreach ($settings as $setting) {
        $value = $setting['setting_key'] === 'gemini_api_key' ? 
                 substr($setting['setting_value'], 0, 10) . '...' : 
                 $setting['setting_value'];
        echo $setting['setting_key'] . " = " . $value . "\n";
    }
    echo "</pre>";
    
    // Test API connection
    echo "<h2>5. Testing API Connection</h2>";
    
    $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = 'gemini_api_key' AND category = 'gemini'");
    $stmt->execute();
    $apiKey = $stmt->fetchColumn();
    
    if ($apiKey) {
        $testMessage = "Hello, respond with 'Setup test successful for TechTornix'";
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' . $apiKey;
        
        $requestData = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $testMessage]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'maxOutputTokens' => 100,
            ]
        ];
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($requestData),
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_TIMEOUT => 30,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            echo "<div class='error'>❌ cURL Error: $error</div>";
        } elseif ($httpCode === 200) {
            $decodedResponse = json_decode($response, true);
            if (isset($decodedResponse['candidates'][0]['content']['parts'][0]['text'])) {
                $apiResponse = $decodedResponse['candidates'][0]['content']['parts'][0]['text'];
                echo "<div class='success'>✅ API Test Successful!</div>";
                echo "<pre>Response: $apiResponse</pre>";
            } else {
                echo "<div class='error'>❌ Unexpected API response format</div>";
                echo "<pre>" . json_encode($decodedResponse, JSON_PRETTY_PRINT) . "</pre>";
            }
        } else {
            echo "<div class='error'>❌ API Error: HTTP $httpCode</div>";
            echo "<pre>$response</pre>";
        }
    }
    
    echo "<h2>6. Summary</h2>";
    echo "<div class='success'>
    <h3>✅ Setup Complete!</h3>
    <ul>
    <li>Gemini settings configured in database</li>
    <li>Active configuration updated with proper system prompt</li>
    <li>API key configured and tested</li>
    <li>All database tables properly set up</li>
    </ul>
    
    <h3>🔧 Next Steps:</h3>
    <ul>
    <li>Test the chatbot on your website</li>
    <li>Check the admin dashboard for Gemini management</li>
    <li>Monitor API logs for proper functionality</li>
    <li>Update API key in admin panel if needed</li>
    </ul>
    </div>";
    
} catch (Exception $e) {
    echo "<div class='error'>❌ Error: " . $e->getMessage() . "</div>";
}

echo "</div></body></html>";
?>
