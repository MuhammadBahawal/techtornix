<?php
require_once 'config/database.php';

// Set content type and CORS headers
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');

echo "<!DOCTYPE html>
<html>
<head>
    <title>TechTornix Gemini Comprehensive Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .test-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { background: #d4edda; border-color: #c3e6cb; color: #155724; }
        .error { background: #f8d7da; border-color: #f5c6cb; color: #721c24; }
        .warning { background: #fff3cd; border-color: #ffeaa7; color: #856404; }
        .info { background: #d1ecf1; border-color: #bee5eb; color: #0c5460; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .btn { padding: 8px 16px; margin: 5px; border: none; border-radius: 4px; cursor: pointer; }
        .btn-primary { background: #007bff; color: white; }
        .btn-success { background: #28a745; color: white; }
        .btn-danger { background: #dc3545; color: white; }
        h2 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
        h3 { color: #555; }
    </style>
</head>
<body>
<div class='container'>
<h1>🚀 TechTornix Gemini Integration Test Suite</h1>";

// Test 1: Database Connection
echo "<div class='test-section'>";
echo "<h2>1. Database Connection Test</h2>";
try {
    $config = getDatabaseConfig();
    $db = new PDO(
        "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}",
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "<div class='success'>✅ Database connection successful</div>";
    echo "<pre>Host: {$config['host']}\nDatabase: {$config['dbname']}</pre>";
} catch (Exception $e) {
    echo "<div class='error'>❌ Database connection failed: " . $e->getMessage() . "</div>";
    exit;
}
echo "</div>";

// Test 2: Check Table Structure
echo "<div class='test-section'>";
echo "<h2>2. Database Table Structure</h2>";

// Check existing tables
$stmt = $db->query("SHOW TABLES LIKE '%gemini%'");
$tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo "<h3>Existing Gemini Tables:</h3>";
foreach ($tables as $table) {
    echo "<div class='info'>📋 Table: $table</div>";
    
    // Show table structure
    $stmt = $db->query("DESCRIBE $table");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "<pre>";
    foreach ($columns as $col) {
        echo "{$col['Field']} - {$col['Type']} - {$col['Null']} - {$col['Key']}\n";
    }
    echo "</pre>";
}

// Create missing gemini_settings table if needed
echo "<h3>Creating/Updating gemini_settings table:</h3>";
try {
    $db->exec("CREATE TABLE IF NOT EXISTS gemini_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )");
    
    // Insert default settings
    $stmt = $db->prepare("INSERT INTO gemini_settings (setting_key, setting_value, description) 
                         VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
    
    $settings = [
        ['api_key', 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0', 'Gemini API Key'],
        ['enabled', '1', 'Enable/Disable Gemini API'],
        ['system_prompt', 'You are TechTorix, an AI assistant for TechTornix...', 'System prompt for Gemini']
    ];
    
    foreach ($settings as $setting) {
        $stmt->execute($setting);
    }
    
    echo "<div class='success'>✅ gemini_settings table created/updated successfully</div>";
} catch (Exception $e) {
    echo "<div class='error'>❌ Failed to create gemini_settings: " . $e->getMessage() . "</div>";
}
echo "</div>";

// Test 3: API Key Test
echo "<div class='test-section'>";
echo "<h2>3. Gemini API Key Test</h2>";

$stmt = $db->prepare("SELECT setting_value FROM gemini_settings WHERE setting_key = 'api_key'");
$stmt->execute();
$apiKey = $stmt->fetchColumn();

if ($apiKey) {
    echo "<div class='info'>🔑 API Key found: " . substr($apiKey, 0, 10) . "...</div>";
    
    // Test API call
    $testMessage = "Hello, respond with 'API test successful for TechTornix'";
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
            echo "<div class='success'>✅ API call successful!</div>";
            echo "<pre>Response: $apiResponse</pre>";
        } else {
            echo "<div class='warning'>⚠️ Unexpected API response format</div>";
            echo "<pre>" . json_encode($decodedResponse, JSON_PRETTY_PRINT) . "</pre>";
        }
    } else {
        echo "<div class='error'>❌ API Error: HTTP $httpCode</div>";
        echo "<pre>$response</pre>";
    }
} else {
    echo "<div class='error'>❌ No API key found in database</div>";
}
echo "</div>";

// Test 4: Backend Endpoint Test
echo "<div class='test-section'>";
echo "<h2>4. Backend Endpoint Test</h2>";

// Test chatbot endpoint
echo "<h3>Testing /api/gemini/chatbot endpoint:</h3>";
$testUrl = 'https://techtornix.com/api/gemini/chatbot';
$testData = json_encode(['message' => 'Hello, test message']);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $testUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $testData,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "<div class='error'>❌ Endpoint cURL Error: $error</div>";
} else {
    echo "<div class='info'>📡 HTTP Code: $httpCode</div>";
    echo "<pre>Response: $response</pre>";
    
    if ($httpCode === 200) {
        $decodedResponse = json_decode($response, true);
        if ($decodedResponse && isset($decodedResponse['success'])) {
            echo "<div class='success'>✅ Endpoint responding correctly</div>";
        } else {
            echo "<div class='warning'>⚠️ Unexpected endpoint response format</div>";
        }
    } else {
        echo "<div class='error'>❌ Endpoint error</div>";
    }
}
echo "</div>";

// Test 5: File Existence Check
echo "<div class='test-section'>";
echo "<h2>5. File Existence Check</h2>";

$files = [
    'utils/GeminiService.php',
    'api/gemini/chatbot.php',
    'api/gemini/admin.php',
    'index.php'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        echo "<div class='success'>✅ $file exists</div>";
    } else {
        echo "<div class='error'>❌ $file missing</div>";
    }
}
echo "</div>";

// Test 6: Frontend Test
echo "<div class='test-section'>";
echo "<h2>6. Frontend Integration Test</h2>";
echo "<p>Test the chatbot widget on your website:</p>";
echo "<button class='btn btn-primary' onclick='testChatbot()'>Test Chatbot Widget</button>";
echo "<div id='chatbot-test-result'></div>";

echo "<script>
function testChatbot() {
    const resultDiv = document.getElementById('chatbot-test-result');
    resultDiv.innerHTML = '<div class=\"info\">🔄 Testing chatbot...</div>';
    
    fetch('https://techtornix.com/api/gemini/chatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Hello from test script'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = '<div class=\"success\">✅ Chatbot test successful!</div><pre>' + JSON.stringify(data, null, 2) + '</pre>';
        } else {
            resultDiv.innerHTML = '<div class=\"error\">❌ Chatbot test failed</div><pre>' + JSON.stringify(data, null, 2) + '</pre>';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = '<div class=\"error\">❌ Network error: ' + error.message + '</div>';
    });
}
</script>";
echo "</div>";

// Summary
echo "<div class='test-section'>";
echo "<h2>7. Summary & Next Steps</h2>";
echo "<div class='info'>
<h3>✅ Completed Tasks:</h3>
<ul>
<li>Database connection verified</li>
<li>Table structure checked and updated</li>
<li>API key tested</li>
<li>Backend endpoints tested</li>
<li>File existence verified</li>
</ul>

<h3>🔧 Recommended Actions:</h3>
<ul>
<li>Test the chatbot widget on your live website</li>
<li>Check browser console for any JavaScript errors</li>
<li>Verify CORS headers are working correctly</li>
<li>Monitor API usage and logs</li>
</ul>
</div>";
echo "</div>";

echo "</div></body></html>";
?>
