<?php
class Auth {
    private $db;
    
    public function __construct($database) {
        $this->db = $database;
        $this->startSession();
    }
    
    private function startSession() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }
    
    public function login($email, $password) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM admins WHERE email = ? AND is_active = 1");
            $stmt->execute([$email]);
            $admin = $stmt->fetch();
            
            if (!$admin) {
                $this->logFailedAttempt($email);
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            // Check if account is locked
            if ($admin['locked_until'] && new DateTime() < new DateTime($admin['locked_until'])) {
                return ['success' => false, 'message' => 'Account is temporarily locked. Please try again later.'];
            }
            
            if (!password_verify($password, $admin['password'])) {
                $this->incrementFailedAttempts($admin['id']);
                return ['success' => false, 'message' => 'Invalid credentials'];
            }
            
            // Reset failed attempts on successful login
            $this->resetFailedAttempts($admin['id']);
            
            // Update last login
            $this->updateLastLogin($admin['id']);
            
            // Set session directly (no OTP required)
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_email'] = $admin['email'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['admin_role'] = $admin['role'];
            $_SESSION['login_time'] = time();
            
            return [
                'success' => true,
                'message' => 'Login successful',
                'admin' => [
                    'id' => $admin['id'],
                    'username' => $admin['username'],
                    'email' => $admin['email'],
                    'role' => $admin['role']
                ]
            ];
            
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            return ['success' => false, 'message' => 'An error occurred. Please try again.'];
        }
    }
    
    public function isLoggedIn() {
        return isset($_SESSION['admin_id']) && !$this->isSessionExpired();
    }
    
    public function requireAuth() {
        if (!$this->isLoggedIn()) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Authentication required']);
            exit;
        }
    }
    
    public function logout() {
        session_destroy();
        return ['success' => true, 'message' => 'Logged out successfully'];
    }
    
    public function getCurrentAdmin() {
        if (!$this->isLoggedIn()) {
            return null;
        }
        
        return [
            'id' => $_SESSION['admin_id'],
            'username' => $_SESSION['admin_username'],
            'email' => $_SESSION['admin_email'],
            'role' => $_SESSION['admin_role']
        ];
    }
    
    private function incrementFailedAttempts($adminId) {
        $stmt = $this->db->prepare("
            UPDATE admins 
            SET login_attempts = login_attempts + 1,
                locked_until = CASE 
                    WHEN login_attempts >= 4 THEN DATE_ADD(NOW(), INTERVAL 30 MINUTE)
                    ELSE locked_until 
                END
            WHERE id = ?
        ");
        $stmt->execute([$adminId]);
    }
    
    private function resetFailedAttempts($adminId) {
        $stmt = $this->db->prepare("UPDATE admins SET login_attempts = 0, locked_until = NULL WHERE id = ?");
        $stmt->execute([$adminId]);
    }
    
    private function logFailedAttempt($email) {
        error_log("Failed login attempt for email: " . $email . " from IP: " . $_SERVER['REMOTE_ADDR']);
    }
    
    private function updateLastLogin($adminId) {
        $stmt = $this->db->prepare("UPDATE admins SET last_login = NOW() WHERE id = ?");
        $stmt->execute([$adminId]);
    }
    
    private function isSessionExpired() {
        if (!isset($_SESSION['login_time'])) {
            return true;
        }
        
        // Session expires after 2 hours of inactivity
        return (time() - $_SESSION['login_time']) > 7200;
    }
    
    public function generateCSRFToken() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    public function verifyCSRFToken($token) {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
}
?>
