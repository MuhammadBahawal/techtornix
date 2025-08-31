<?php
// CORS Configuration for Techtornix API
function handleCORS() {
    // Set CORS headers
    header("Access-Control-Allow-Origin: https://techtornix.com");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// Set JSON content type
function setJSONHeaders() {
    header('Content-Type: application/json; charset=utf-8');
}

// Security headers
function setSecurityHeaders() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}

// Handle CORS for all API requests
handleCORS();
setSecurityHeaders();
setJSONHeaders();
?>
