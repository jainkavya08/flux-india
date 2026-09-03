<?php
/**
 * FLUX India - Admin User Generator
 * 
 * Usage 1 (CLI):
 *   php database/create-admin.php [username] [password]
 *   Example: php database/create-admin.php admin StrongPass123!
 * 
 * Usage 2 (Browser - Local or Setup):
 *   Open in browser: http://localhost:3000/database/create-admin.php?user=admin&pass=StrongPass123!
 *   (Or run locally to get the SQL statement for phpMyAdmin)
 */

define('FLUX_APP', true);

$username = '';
$password = '';

// Check CLI arguments
if (php_sapi_name() === 'cli') {
    $username = isset($argv[1]) ? trim($argv[1]) : '';
    $password = isset($argv[2]) ? trim($argv[2]) : '';
} else {
    // Web request
    $username = isset($_GET['user']) ? trim($_GET['user']) : (isset($_POST['user']) ? trim($_POST['user']) : '');
    $password = isset($_GET['pass']) ? trim($_GET['pass']) : (isset($_POST['pass']) ? trim($_POST['pass']) : '');
}

if (empty($username) || empty($password)) {
    if (php_sapi_name() === 'cli') {
        echo "=====================================================\n";
        echo "  FLUX India - Admin User Setup Tool\n";
        echo "=====================================================\n";
        echo "Usage: php create-admin.php <username> <password>\n\n";
        echo "Example: php create-admin.php admin Admin@Flux2026\n";
        exit(1);
    }
}

// Generate secure bcrypt hash
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

// Escape for SQL display
$escapedUser = addslashes($username);
$escapedHash = addslashes($hash);

$sqlStatement = "INSERT INTO `admin_users` (`username`, `password_hash`, `created_at`)\n"
              . "VALUES ('{$escapedUser}', '{$escapedHash}', NOW())\n"
              . "ON DUPLICATE KEY UPDATE `password_hash` = '{$escapedHash}';";

// Try direct database insertion if config exists
$dbInserted = false;
$dbError = null;

$configFile = __DIR__ . '/../api/config.php';
if (!file_exists($configFile)) {
    $configFile = __DIR__ . '/../public/api/config.php';
}

if (file_exists($configFile)) {
    try {
        require_once $configFile;
        if (defined('DB_HOST') && defined('DB_NAME') && defined('DB_USER') && defined('DB_PASS') && DB_HOST !== 'sqlxxx.infinityfree.com') {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);

            $stmt = $pdo->prepare("
                INSERT INTO `admin_users` (`username`, `password_hash`, `created_at`)
                VALUES (:username, :hash, NOW())
                ON DUPLICATE KEY UPDATE `password_hash` = :hash_update
            ");
            $stmt->execute([
                ':username' => $username,
                ':hash' => $hash,
                ':hash_update' => $hash,
            ]);
            $dbInserted = true;
        }
    } catch (Exception $e) {
        $dbError = $e->getMessage();
    }
}

// Output response
if (php_sapi_name() === 'cli') {
    echo "=====================================================\n";
    echo "  FLUX India - Admin Account Credentials Generated\n";
    echo "=====================================================\n";
    echo "Username:      " . $username . "\n";
    echo "Password Hash: " . $hash . "\n";
    echo "-----------------------------------------------------\n";
    if ($dbInserted) {
        echo "✓ Successfully inserted directly into configured database!\n";
    } else {
        echo "Run this SQL query in your InfinityFree phpMyAdmin:\n\n";
        echo $sqlStatement . "\n\n";
    }
    echo "=====================================================\n";
} else {
    header('Content-Type: text/html; charset=utf-8');
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>FLUX Admin Account Generator</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f4f8fc; color: #0d2b4e; padding: 40px 20px; }
            .card { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #bcdbf7; box-shadow: 0 4px 20px rgba(13,43,78,0.06); }
            h2 { margin-top: 0; color: #0d2b4e; }
            label { display: block; font-weight: bold; margin: 15px 0 5px; font-size: 13px; text-transform: uppercase; }
            input[type="text"], input[type="password"] { width: 100%; padding: 10px; border: 1px solid #bcdbf7; border-radius: 8px; box-sizing: border-box; font-size: 14px; }
            button { background: #1a56b0; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px; }
            pre { background: #0d2b4e; color: #bcdbf7; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
            .badge-success { background: #dcfce7; color: #15803d; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>FLUX Admin Account Setup</h2>
            <form method="POST">
                <label>Admin Username</label>
                <input type="text" name="user" value="<?php echo htmlspecialchars($username ?: 'admin'); ?>" required>
                
                <label>Admin Password</label>
                <input type="password" name="pass" placeholder="Enter secure password" required>
                
                <button type="submit">Generate SQL / Insert Admin</button>
            </form>

            <?php if (!empty($username) && !empty($password)): ?>
                <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eaf3fc;">
                <?php if ($dbInserted): ?>
                    <div class="badge-success">✓ Admin user successfully inserted into MySQL!</div>
                <?php endif; ?>
                <label>Direct SQL to Run in phpMyAdmin:</label>
                <pre><?php echo htmlspecialchars($sqlStatement); ?></pre>
                <p style="font-size: 12px; color: #64748b;">Copy and paste the SQL command above in your InfinityFree phpMyAdmin SQL tab to create or update this admin user.</p>
            <?php endif; ?>
        </div>
    </body>
    </html>
    <?php
}
