<?php
require_once '../../config/database.php';
require_once '../../utils/Auth.php';

// CORS Headers
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost',
    'https://techtornix.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: https://techtornix.com");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$database = new Database();
$db = $database->getConnection();
$auth = new Auth($db);

$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'] ?? '';

// Parse path to get endpoint
$pathParts = array_filter(explode('/', $path));
$endpoint = $pathParts[0] ?? '';

switch ($method) {
    case 'GET':
        if ($endpoint === 'realtime') {
            $auth->requireAuth();
            getRealTimeAnalytics($db);
        } elseif ($endpoint === 'overview') {
            $auth->requireAuth();
            getAnalyticsOverview($db);
        } else {
            $auth->requireAuth();
            getAnalyticsOverview($db);
        }
        break;
    case 'POST':
        if ($endpoint === 'track') {
            trackVisitor($db);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Endpoint not found']);
        }
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}

function getRealTimeAnalytics($db) {
    try {
        // Get active visitors (last 5 minutes)
        $stmt = $db->prepare("
            SELECT COUNT(DISTINCT session_id) as active_visitors 
            FROM analytics 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        ");
        $stmt->execute();
        $activeVisitors = $stmt->fetch(PDO::FETCH_ASSOC)['active_visitors'];

        // Get recent sessions (last 30 minutes)
        $stmt = $db->prepare("
            SELECT 
                page_url,
                visitor_ip,
                user_agent,
                referrer,
                session_id,
                created_at,
                CASE 
                    WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' OR user_agent LIKE '%iPhone%' THEN 'mobile'
                    WHEN user_agent LIKE '%Tablet%' OR user_agent LIKE '%iPad%' THEN 'tablet'
                    ELSE 'desktop'
                END as device,
                CASE 
                    WHEN user_agent LIKE '%Chrome%' THEN 'Chrome'
                    WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
                    WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari'
                    WHEN user_agent LIKE '%Edge%' THEN 'Edge'
                    ELSE 'Other'
                END as browser
            FROM analytics 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
            ORDER BY created_at DESC 
            LIMIT 20
        ");
        $stmt->execute();
        $sessions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format sessions for frontend
        $recentSessions = array_map(function($session) {
            return [
                'device' => $session['device'],
                'browser' => $session['browser'],
                'country' => 'Unknown', // Could integrate with IP geolocation service
                'city' => null,
                'currentPage' => $session['page_url'],
                'lastActivity' => $session['created_at']
            ];
        }, $sessions);

        echo json_encode([
            'success' => true,
            'activeVisitors' => (int)$activeVisitors,
            'recentSessions' => $recentSessions,
            'timestamp' => date('Y-m-d H:i:s')
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching analytics: ' . $e->getMessage()
        ]);
    }
}

function getAnalyticsOverview($db) {
    try {
        // Total visitors today
        $stmt = $db->prepare("
            SELECT COUNT(DISTINCT session_id) as today_visitors 
            FROM analytics 
            WHERE DATE(created_at) = CURDATE()
        ");
        $stmt->execute();
        $todayVisitors = $stmt->fetch(PDO::FETCH_ASSOC)['today_visitors'];

        // Total page views today
        $stmt = $db->prepare("
            SELECT COUNT(*) as today_views 
            FROM analytics 
            WHERE DATE(created_at) = CURDATE()
        ");
        $stmt->execute();
        $todayViews = $stmt->fetch(PDO::FETCH_ASSOC)['today_views'];

        // Top pages today
        $stmt = $db->prepare("
            SELECT page_url, COUNT(*) as views 
            FROM analytics 
            WHERE DATE(created_at) = CURDATE()
            GROUP BY page_url 
            ORDER BY views DESC 
            LIMIT 10
        ");
        $stmt->execute();
        $topPages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Browser stats
        $stmt = $db->prepare("
            SELECT 
                CASE 
                    WHEN user_agent LIKE '%Chrome%' THEN 'Chrome'
                    WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
                    WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari'
                    WHEN user_agent LIKE '%Edge%' THEN 'Edge'
                    ELSE 'Other'
                END as browser,
                COUNT(*) as count
            FROM analytics 
            WHERE DATE(created_at) = CURDATE()
            GROUP BY browser 
            ORDER BY count DESC
        ");
        $stmt->execute();
        $browserStats = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'todayVisitors' => (int)$todayVisitors,
            'todayViews' => (int)$todayViews,
            'topPages' => $topPages,
            'browserStats' => $browserStats,
            'timestamp' => date('Y-m-d H:i:s')
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching analytics overview: ' . $e->getMessage()
        ]);
    }
}

function trackVisitor($db) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $pageUrl = $input['page_url'] ?? $_SERVER['REQUEST_URI'] ?? '/';
        $visitorIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        $referrer = $_SERVER['HTTP_REFERER'] ?? '';
        $sessionId = $input['session_id'] ?? session_id();

        $stmt = $db->prepare("
            INSERT INTO analytics (page_url, visitor_ip, user_agent, referrer, session_id, created_at) 
            VALUES (?, ?, ?, ?, ?, NOW())
        ");
        
        $stmt->execute([$pageUrl, $visitorIp, $userAgent, $referrer, $sessionId]);

        echo json_encode([
            'success' => true,
            'message' => 'Visitor tracked successfully'
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error tracking visitor: ' . $e->getMessage()
        ]);
    }
}
?>
