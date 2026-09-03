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
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destroy session
session_destroy();

sendJsonResponse(true, 'Logged out successfully.');
