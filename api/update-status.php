<?php
/**
 * FLUX India - Admin Status Update Endpoint
 * Updates submission status ('New', 'Reviewed', 'Quoted', 'Closed')
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

handleCors();
requireAdminAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Use POST to update status.', [], 405);
}

// Support JSON body or standard form POST
$rawBody = file_get_contents('php://input');
$bodyData = json_decode($rawBody, true);

$id = null;
$status = '';

if (is_array($bodyData) && isset($bodyData['id'])) {
    $id = filter_var($bodyData['id'], FILTER_VALIDATE_INT);
    $status = isset($bodyData['status']) ? trim($bodyData['status']) : '';
} else {
    $id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_VALIDATE_INT) : null;
    $status = isset($_POST['status']) ? trim($_POST['status']) : '';
}

if (!$id || $id <= 0) {
    sendJsonResponse(false, 'Invalid submission ID.', [], 400);
}

$validStatuses = ['New', 'Reviewed', 'Quoted', 'Closed'];
if (!in_array($status, $validStatuses, true)) {
    sendJsonResponse(false, 'Invalid status value. Allowed: New, Reviewed, Quoted, Closed.', [], 400);
}

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("UPDATE `bom_submissions` SET `status` = :status WHERE `id` = :id");
    $stmt->execute([
        ':status' => $status,
        ':id'     => $id,
    ]);

    if ($stmt->rowCount() === 0) {
        // Check if record exists
        $checkStmt = $pdo->prepare("SELECT `id` FROM `bom_submissions` WHERE `id` = :id LIMIT 1");
        $checkStmt->execute([':id' => $id]);
        if (!$checkStmt->fetch()) {
            sendJsonResponse(false, 'Submission not found.', [], 404);
        }
    }

    sendJsonResponse(true, "Status updated to '{$status}'.", [
        'id'     => $id,
        'status' => $status,
    ]);

} catch (Exception $e) {
    error_log("[FLUX Status Update Error] " . $e->getMessage());
    sendJsonResponse(false, 'Failed to update submission status.', [], 500);
}
