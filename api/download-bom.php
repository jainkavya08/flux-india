<?php
/**
 * FLUX India - Secure BOM File Download Endpoint
 * Allows authenticated administrators to download uploaded customer BOM files safely
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

// Enforce admin authentication
startAdminSession();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(403);
    die("Access Denied: You must be an authenticated administrator to download BOM attachments.");
}

$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

if (!$id || $id <= 0) {
    http_response_code(400);
    die("Error: Invalid submission ID.");
}

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        SELECT `id`, `bom_filename`, `bom_filepath` 
        FROM `bom_submissions` 
        WHERE `id` = :id 
        LIMIT 1
    ");
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();

    if (!$row || empty($row['bom_filepath'])) {
        http_response_code(404);
        die("Error: No BOM file attachment exists for this submission.");
    }

    $uploadDir = defined('UPLOAD_DIR') ? UPLOAD_DIR : dirname(__DIR__) . '/uploads/bom/';
    $storedFilename = basename($row['bom_filepath']); // basename prevents traversal
    $filePath = $uploadDir . $storedFilename;

    // Verify file existence
    if (!file_exists($filePath) || !is_readable($filePath)) {
        http_response_code(404);
        die("Error: The requested file was not found on the server.");
    }

    // Directory traversal security check
    $realUploadDir = realpath($uploadDir);
    $realFilePath  = realpath($filePath);

    if ($realFilePath === false || strpos($realFilePath, $realUploadDir) !== 0) {
        error_log("[FLUX Security Alert] Path traversal attempt blocked for ID: {$id}, path: {$filePath}");
        http_response_code(403);
        die("Error: Access to this file path is forbidden.");
    }

    // Determine download filename
    $downloadName = !empty($row['bom_filename']) ? $row['bom_filename'] : $storedFilename;
    // Sanitize download filename for header
    $safeDownloadName = preg_replace('/[^a-zA-Z0-9_\-\. ]/', '_', $downloadName);

    // Determine MIME type
    $mimeType = 'application/octet-stream';
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detected = finfo_file($finfo, $realFilePath);
        if ($detected) {
            $mimeType = $detected;
        }
        finfo_close($finfo);
    }

    // Clear output buffer to avoid corrupting binary downloads
    if (ob_get_level()) {
        ob_end_clean();
    }

    // Send download headers
    header('Content-Description: File Transfer');
    header('Content-Type: ' . $mimeType);
    header('Content-Disposition: attachment; filename="' . $safeDownloadName . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($realFilePath));

    // Stream file
    readfile($realFilePath);
    exit;

} catch (Exception $e) {
    error_log("[FLUX Download Error] " . $e->getMessage());
    http_response_code(500);
    die("Server Error: Unable to process file download.");
}
