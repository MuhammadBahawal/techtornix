<?php
header('Content-Type: text/html; charset=utf-8');
echo "<h2>🔍 Gemini API Debug Tool</h2>";
echo "<pre>";

// Test 1: Check if database connection works
echo "=== TEST 1: Database Connection ===\n";
try {
    require_once 'config/database.php';
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Database connection successful\n";
    
    // Check if gemini_settings table exists
    $stmt = $db->query("SHOW TABLES LIKE 'gemini_settings'");
    if ($stmt->rowCount() > 0) {
        echo "✅ gemini_settings table exists\n";
        
        // Check if API key is configured
        $stmt = $db->prepare("SELECT setting_value FROM gemini_settings WHERE setting_key = 'api_key'");
        $stmt->execute();
        $apiKey = $stmt->fetchColumn();
        
        if ($apiKey) {
            echo "✅ API key configured: " . substr($apiKey, 0, 10) . "...\n";
        } else {
            echo "❌ API key not found in database\n";
        }
        
        // Check if Gemini is enabled
        $stmt = $db->prepare("SELECT setting_value FROM gemini_settings WHERE setting_key = 'enabled'");
        $stmt->execute();
        $enabled = $stmt->fetchColumn();
        echo "📊 Gemini enabled: " . ($enabled ? 'Yes' : 'No') . "\n";
        
    } else {
        echo "❌ gemini_settings table does not exist\n";
    }
} catch (Exception $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}

echo "\n=== TEST 2: Direct Gemini API Test ===\n";
$testApiKey = 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0';
$testMessage = "Hello, who is the owner of TechTornix?";

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $testApiKey;

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
        'topK' => 40,
        'topP' => 0.95,
        'maxOutputTokens' => 1024,
    ]
];

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($requestData),
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
    echo "❌ cURL Error: $error\n";
} elseif ($httpCode !== 200) {
    echo "❌ HTTP Error: $httpCode\n";
    echo "Response: $response\n";
} else {
    $data = json_decode($response, true);
    if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
        $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'];
        echo "✅ Direct Gemini API working!\n";
        echo "🤖 Response: " . substr($aiResponse, 0, 100) . "...\n";
    } else {
        echo "❌ Unexpected response format\n";
        echo "Response: " . substr($response, 0, 200) . "...\n";
    }
}

echo "\n=== TEST 3: Backend Routing Test ===\n";

// Simulate the chatbot endpoint
echo "Testing chatbot endpoint logic...\n";

try {
    // Include the GeminiService
    if (file_exists('utils/GeminiService.php')) {
        require_once 'utils/GeminiService.php';
        echo "✅ GeminiService.php found\n";
        
        $geminiService = new GeminiService();
        $testResponse = $geminiService->sendMessage($testMessage);
        
        if ($testResponse) {
            echo "✅ GeminiService working!\n";
            echo "🤖 Response: " . substr($testResponse, 0, 100) . "...\n";
        } else {
            echo "❌ GeminiService returned empty response\n";
        }
    } else {
        echo "❌ GeminiService.php not found\n";
    }
} catch (Exception $e) {
    echo "❌ GeminiService error: " . $e->getMessage() . "\n";
}

echo "\n=== TEST 4: API Endpoint Test ===\n";

// Test the actual API endpoints
$endpoints = [
    '/api/gemini/chatbot' => 'POST',
    '/api/gemini/admin' => 'GET'
];

foreach ($endpoints as $endpoint => $method) {
    echo "Testing $method $endpoint...\n";
    
    if (file_exists('api/gemini/chatbot.php') && $endpoint === '/api/gemini/chatbot') {
        echo "✅ chatbot.php file exists\n";
    } elseif (file_exists('api/gemini/admin.php') && $endpoint === '/api/gemini/admin') {
        echo "✅ admin.php file exists\n";
    } else {
        echo "❌ Endpoint file missing\n";
    }
}

echo "\n=== RECOMMENDATIONS ===\n";

if (!isset($apiKey) || !$apiKey) {
    echo "🔧 Run: https://techtornix.com/api/init_database.php\n";
}

echo "🔧 Check browser console for API errors\n";
echo "🔧 Verify .htaccess files are uploaded\n";
echo "🔧 Test API directly: https://techtornix.com/api/gemini/chatbot\n";

echo "</pre>";
?>
