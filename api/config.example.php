<?php
/**
 * FLUX India - API & Database Configuration Template
 *
 * Hostinger configuration template.
 *
 * Copy this file to `config.php` in the same directory.
 * Never commit `config.php` with real credentials to GitHub.
 */

if (!defined('FLUX_APP')) {
    define('FLUX_APP', true);
}

// -------------------------------------------------------------
// Hostinger MySQL Database
// -------------------------------------------------------------
define('DB_HOST', 'localhost');
define('DB_NAME', 'u797413374_flux');
define('DB_USER', 'u797413374_flux');
define('DB_PASS', 'your_hostinger_database_password');
define('DB_PORT', '3306');

// -------------------------------------------------------------
// Application & Security Settings
// -------------------------------------------------------------
define('APP_ENV', 'production');

define('ADMIN_EMAIL', 'sales@fluxindia.in');

define('FROM_EMAIL', 'noreply@fluxindia.co.in');

define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/bom/');

define('MAX_FILE_SIZE', 10 * 1024 * 1024);

// Allowed Frontend Origins for CORS validation
define('ALLOWED_ORIGINS', [
    'https://fluxindia.co.in',
    'https://www.fluxindia.co.in',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
]);