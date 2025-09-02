<?php
// Test script for Gemini API
$apiKey = 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0';
$testMessage = "Hello! Can you tell me about TechTornix?";

echo "🧪 Testing Gemini API Key...\n";
echo "📝 Test Message: $testMessage\n\n";

// Prepare the request
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" . $apiKey;

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

// Initialize cURL
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
    exit(1);
}

if ($httpCode !== 200) {
    echo "❌ HTTP Error: $httpCode\n";
    echo "Response: $response\n";
    exit(1);
}

$data = json_decode($response, true);

if (isset($data['candidates'][0]['content']['parts'][0]['text'])) {
    $aiResponse = $data['candidates'][0]['content']['parts'][0]['text'];
    echo "✅ API Key is working!\n";
    echo "🤖 Gemini Response:\n";
    echo "---\n";
    echo $aiResponse . "\n";
    echo "---\n";
    echo "🎉 Your Gemini API integration is ready!\n";
} else {
    echo "❌ Unexpected response format:\n";
    echo $response . "\n";
}
?>
