<?php
header('Content-Type: text/html; charset=utf-8');
require_once 'config/database.php';

echo "<h2>🚀 TechTornix Gemini Database Initialization</h2>";
echo "<pre>";

try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Database connection successful\n\n";
    
    // Create gemini_settings table
    $createSettingsTable = "
    CREATE TABLE IF NOT EXISTS gemini_settings (
        id INT PRIMARY KEY AUTO_INCREMENT,
        setting_key VARCHAR(100) UNIQUE NOT NULL,
        setting_value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $db->exec($createSettingsTable);
    echo "✅ Created gemini_settings table\n";
    
    // Create gemini_logs table
    $createLogsTable = "
    CREATE TABLE IF NOT EXISTS gemini_logs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        request_message TEXT NOT NULL,
        response_message TEXT,
        tokens_used INT DEFAULT 0,
        success BOOLEAN DEFAULT FALSE,
        error_message TEXT,
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $db->exec($createLogsTable);
    echo "✅ Created gemini_logs table\n";
    
    // Insert your API key
    $apiKey = 'AIzaSyCxfquUmnwGe9o9vItJQ_59jn5YgLcpvT0';
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('api_key', ?) 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    $stmt->execute([$apiKey]);
    echo "✅ API key configured: " . substr($apiKey, 0, 10) . "...\n";
    
    // Enable Gemini by default
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('enabled', '1') 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    $stmt->execute();
    echo "✅ Gemini AI enabled\n";
    
    // Set system prompt
    $systemPrompt = "You are an AI assistant for TechTornix, a leading technology company. Provide helpful, professional responses about TechTornix services, technology topics, and general assistance. Keep responses concise and friendly.";
    $stmt = $db->prepare("
        INSERT INTO gemini_settings (setting_key, setting_value) 
        VALUES ('system_prompt', ?) 
        ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        updated_at = CURRENT_TIMESTAMP
    ");
    $stmt->execute([$systemPrompt]);
    echo "✅ System prompt configured\n";
    
    // Verify data
    echo "\n📊 Current Settings:\n";
    $stmt = $db->query("SELECT setting_key, LEFT(setting_value, 50) as preview FROM gemini_settings");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "   {$row['setting_key']}: {$row['preview']}" . (strlen($row['preview']) == 50 ? '...' : '') . "\n";
    }
    
    echo "\n🎉 Database initialization completed successfully!\n";
    echo "🔗 Next: <a href='test_crud_operations.php'>Test CRUD Operations</a>\n";
    
} catch (PDOException $e) {
    echo "❌ Database Error: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "</pre>";
?>
