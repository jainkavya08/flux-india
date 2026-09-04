<?php
/**
 * FLUX India - Admin Logout Endpoint
 * Terminates the PHP session securely
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

handleCors();

startAdminSession();

// Unset all session variables
$_SESSION = [];

// Destroy session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires'  => time() - 42000,
        'path'     => $params["path"],
        'domain'   => $params["domain"],
        'secure'   => $params["secure"],
        'httponly' => $params["httponly"],
        'samesite' => $params["samesite"] ?? 'Lax',
    ]);
}

// Destroy session
session_destroy();

sendJsonResponse(true, 'Logged out successfully.');
