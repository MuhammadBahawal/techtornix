<?php
require_once 'config/database.php';

// Your Gemini API Key
$apiKey = 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0';

try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if gemini_settings table exists, if not create it
    $createTable = "
    CREATE TABLE IF NOT EXISTS gemini_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $db->exec($createTable);
    
    // Insert or update the API key
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('api_key', ?) 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    
    $stmt->execute([$apiKey]);
    
    // Enable Gemini by default
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('enabled', '1') 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    
    $stmt->execute();
    
    // Set default system prompt
    $systemPrompt = "You are an AI assistant for TechTornix, a leading technology company. You should provide helpful, professional responses about TechTornix services, technology topics, and general assistance. Keep responses concise and friendly.";
    
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('system_prompt', ?) 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    
    $stmt->execute([$systemPrompt]);
    
    echo "✅ Gemini API key has been successfully configured!\n";
    echo "🔑 API Key: " . substr($apiKey, 0, 10) . "...\n";
    echo "✨ Gemini AI is now enabled for your chatbot\n";
    echo "🎯 You can manage settings through the admin dashboard at /admin/gemini\n";
    
} catch (PDOException $e) {
    echo "❌ Database Error: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
