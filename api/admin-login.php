<?php
/**
 * FLUX India - Admin Login Endpoint
 * Authenticates admin credentials using bcrypt password_verify and establishes secure PHP session
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

// Handle CORS
handleCors();

// Accept POST or check current session status on GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    startAdminSession();
    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
        sendJsonResponse(true, 'Already authenticated', [
            'authenticated' => true,
            'username'      => $_SESSION['admin_user']
        ]);
    } else {
        sendJsonResponse(false, 'Not authenticated', [
            'authenticated' => false
        ], 401);
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Use POST for login.', [], 405);
}

// Support both JSON body and standard POST form data
$rawBody = file_get_contents('php://input');
$bodyData = json_decode($rawBody, true);

$username = '';
$password = '';

if (is_array($bodyData) && isset($bodyData['username'])) {
    $username = trim($bodyData['username']);
    $password = isset($bodyData['password']) ? trim($bodyData['password']) : '';
} else {
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
}

if (empty($username) || empty($password)) {
    sendJsonResponse(false, 'Username and password are required.', [], 400);
}

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT `id`, `username`, `password_hash` FROM `admin_users` WHERE `username` = :username LIMIT 1");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Authentication success
        startAdminSession();
        session_regenerate_id(true);

        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user']      = $user['username'];
        $_SESSION['admin_id']        = (int)$user['id'];
        $_SESSION['last_activity']   = time();

        sendJsonResponse(true, 'Login successful.', [
            'username' => $user['username'],
        ]);
    } else {
        // Delay response slightly to mitigate brute-force timing attacks
        usleep(300000); // 300ms
        sendJsonResponse(false, 'Invalid username or password.', [], 401);
    }

} catch (Exception $e) {
    error_log("[FLUX Admin Login Error] " . $e->getMessage());
    sendJsonResponse(false, 'A server error occurred during authentication.', [], 500);
}
