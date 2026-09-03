<?php
/**
 * FLUX India - Database Connection & Backend Helpers
 */

if (!defined('FLUX_APP')) {
    define('FLUX_APP', true);
}

// Load configuration
$configFile = __DIR__ . '/config.php';
if (file_exists($configFile)) {
    require_once $configFile;
} else {
    // Fallback to example configuration if config.php is not yet created
    $exampleConfig = __DIR__ . '/config.example.php';
    if (file_exists($exampleConfig)) {
        require_once $exampleConfig;
    }
}

/**
 * Handle CORS safely
 */
function handleCors() {
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (defined('ALLOWED_ORIGINS') && is_array(ALLOWED_ORIGINS)) {
        if (in_array($origin, ALLOWED_ORIGINS)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
        }
    }
    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    // Handle preflight OPTIONS request
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Send JSON response
 */
function sendJsonResponse($success, $message = '', $data = [], $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    
    $response = [
        'success' => (bool)$success,
        'message' => $message,
    ];

    if (!empty($data) || is_array($data)) {
        foreach ($data as $key => $val) {
            $response[$key] = $val;
        }
    }

    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Get PDO Database Connection
 */
function getDbConnection() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    if (!defined('DB_HOST') || !defined('DB_NAME') || !defined('DB_USER') || !defined('DB_PASS')) {
        error_log("[FLUX DB Error] Database constants not defined in config.php");
        sendJsonResponse(false, 'Database configuration error. Please contact the administrator.', [], 500);
    }

    $host = DB_HOST;
    $dbname = DB_NAME;
    $user = DB_USER;
    $pass = DB_PASS;
    $port = defined('DB_PORT') ? DB_PORT : '3306';

    $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Log detailed error internally, do not show credentials or host to client
        error_log("[FLUX DB Connection Error] " . $e->getMessage());
        sendJsonResponse(false, 'Unable to connect to the database. Please verify database credentials in api/config.php.', [], 500);
    }
}

/**
 * Initialize secure session for admin
 */
function startAdminSession() {
    if (session_status() === PHP_SESSION_NONE) {
        // Secure session parameters
        $isHttps = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on';
        session_set_cookie_params([
            'lifetime' => 86400, // 24 hours
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }
}

/**
 * Check if the user is an authenticated admin
 */
function requireAdminAuth() {
    startAdminSession();

    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true || empty($_SESSION['admin_user'])) {
        sendJsonResponse(false, 'Unauthorized. Please log in to access the admin area.', [], 401);
    }

    // Optional: session timeout check after 24 hours
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 86400)) {
        session_unset();
        session_destroy();
        sendJsonResponse(false, 'Session expired. Please log in again.', [], 401);
    }

    $_SESSION['last_activity'] = time();
}
