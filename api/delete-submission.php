<?php
/**
 * FLUX India - Admin Delete Submission Endpoint
 * Deletes a BOM submission and its associated file.
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

handleCors();
requireAdminAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Use POST to delete.', [], 405);
}

// Support JSON body or standard form POST
$rawBody = file_get_contents('php://input');
$bodyData = json_decode($rawBody, true);

$id = null;

if (is_array($bodyData) && isset($bodyData['id'])) {
    $id = filter_var($bodyData['id'], FILTER_VALIDATE_INT);
} else {
    $id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_VALIDATE_INT) : null;
}

if (!$id || $id <= 0) {
    sendJsonResponse(false, 'Invalid submission ID.', [], 400);
}

try {
    $pdo = getDbConnection();

    // Fetch the file name so we can delete the file
    $stmt = $pdo->prepare("SELECT `bom_filename` FROM `bom_submissions` WHERE `id` = :id LIMIT 1");
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        sendJsonResponse(false, 'Submission not found.', [], 404);
    }

    $filename = $row['bom_filename'];

    // Delete the file if it exists
    if (!empty($filename)) {
        $filePath = __DIR__ . '/../uploads/bom/' . basename($filename);
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }

    // Delete the database record
    $delStmt = $pdo->prepare("DELETE FROM `bom_submissions` WHERE `id` = :id");
    $delStmt->execute([':id' => $id]);

    sendJsonResponse(true, "Submission deleted successfully.", [
        'id' => $id
    ]);

} catch (Exception $e) {
    error_log("[FLUX Delete Submission Error] " . $e->getMessage());
    sendJsonResponse(false, 'Failed to delete submission.', [], 500);
}
