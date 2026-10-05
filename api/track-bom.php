<?php
/**
 * FLUX India - BOM Tracking API
 * Verifies a customer's Company Name and BOM ID to return live workflow status.
 */

define('FLUX_APP', true);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

// Handle CORS requests using db.php helper
handleCors();

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed.', [], 405);
}

try {
    // Read JSON payload
    $jsonPayload = file_get_contents('php://input');
    $data = json_decode($jsonPayload, true);

    if (!is_array($data)) {
        sendJsonResponse(false, 'Invalid request format.', [], 400);
    }

    $companyName = isset($data['companyName']) ? trim($data['companyName']) : '';
    $bomIdStr = isset($data['bomId']) ? trim($data['bomId']) : '';

    if (empty($companyName) || empty($bomIdStr)) {
        sendJsonResponse(false, 'Company Name and BOM ID are required.', [], 400);
    }

    // Validate BOM ID format (e.g. BOM-00001)
    if (!preg_match('/^BOM-(\d+)$/i', $bomIdStr, $matches)) {
        sendJsonResponse(false, 'We couldn\'t find a BOM matching these details. Please check your company name and BOM ID.', [], 404);
    }

    $submissionId = (int)$matches[1];

    $pdo = getDbConnection();

    $stmt = $pdo->prepare("SELECT * FROM bom_submissions WHERE id = :id");
    $stmt->execute([':id' => $submissionId]);
    $record = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$record) {
        sendJsonResponse(false, 'We couldn\'t find a BOM matching these details. Please check your company name and BOM ID.', [], 404);
    }

    // Check company name case-insensitively
    if (strtolower(trim($record['company_name'])) !== strtolower($companyName)) {
        sendJsonResponse(false, 'We couldn\'t find a BOM matching these details. Please check your company name and BOM ID.', [], 404);
    }

    // Calculate updated_at if column exists, else use submitted_at
    $updatedAt = isset($record['updated_at']) && !empty($record['updated_at']) ? $record['updated_at'] : $record['submitted_at'];

    // Format BOM reference (reconstruct it to ensure correct casing)
    $referenceCode = 'BOM-' . str_pad((string)$record['id'], 5, '0', STR_PAD_LEFT);

    sendJsonResponse(true, 'BOM found.', [
        'data' => [
            'bomId' => $referenceCode,
            'companyName' => $record['company_name'],
            'status' => $record['status'],
            'submittedAt' => $record['submitted_at'],
            'updatedAt' => $updatedAt
        ]
    ]);

} catch (PDOException $e) {
    error_log("[FLUX Track BOM DB Error] " . $e->getMessage());
    sendJsonResponse(false, 'A database error occurred. Please try again later.', [], 500);
} catch (Exception $e) {
    error_log("[FLUX Track BOM Error] " . $e->getMessage());
    sendJsonResponse(false, 'An unexpected error occurred.', [], 500);
}
