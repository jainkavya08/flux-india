<?php
/**
 * FLUX India - API & Database Configuration Template
 * 
 * Instructions:
 * 1. Copy this file to `config.php` in the same directory (`api/config.php`).
 * 2. Replace the placeholder credentials with your InfinityFree MySQL details.
 * 3. Never commit `config.php` with real credentials to GitHub.
 */

if (!defined('FLUX_APP')) {
    define('FLUX_APP', true);
}

// -------------------------------------------------------------
// Database Credentials (from InfinityFree vPanel -> MySQL)
// -------------------------------------------------------------
define('DB_HOST', 'localhost'); // e.g. sql100.infinityfree.com (DO NOT USE localhost on InfinityFree)
define('DB_NAME', 'u797413374_flux');        // e.g. if0_12345678_flux
define('DB_USER', 'u797413374_flux');             // e.g. if0_12345678
define('DB_PASS', 'Fluxindia@2021'); // Your vPanel Account Password
define('DB_PORT', '3306');

// -------------------------------------------------------------
// Application & Security Settings
// -------------------------------------------------------------
define('APP_ENV', 'production'); // 'development' or 'production'

// Recipient email for new BOM intake notifications
define('ADMIN_EMAIL', 'sales@fluxindia.in');

// Sender email for system notifications (use domain email if configured)
define('FROM_EMAIL', 'noreply@fluxindia.rf.gd');

// Upload directory path (Absolute filesystem path)
define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/bom/');

// Maximum allowed upload size (10 MB in bytes)
define('MAX_FILE_SIZE', 10 * 1024 * 1024);

// Allowed Frontend Origins for CORS validation
define('ALLOWED_ORIGINS', [
    'https://fluxindia.co.in',
    'https://www.fluxindia.co.in',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
]);
