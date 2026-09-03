<?php
/**
 * FLUX India - Admin Single Submission Detail API
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

handleCors();
requireAdminAuth();

$id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

if (!$id || $id <= 0) {
    sendJsonResponse(false, 'Invalid submission ID.', [], 400);
}

try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        SELECT 
            `id`,
            `contact_name`,
            `company_name`,
            `business_email`,
            `phone`,
            `requirements`,
            `bom_filename`,
            `bom_filepath`,
            `submitted_at`,
            `status`
        FROM `bom_submissions`
        WHERE `id` = :id
        LIMIT 1
    ");
    $stmt->execute([':id' => $id]);
    $row = $stmt->fetch();

    if (!$row) {
        sendJsonResponse(false, 'Submission not found.', [], 404);
    }

    $timestamp = strtotime($row['submitted_at']);

    $submission = [
        'id'             => (int)$row['id'],
        'referenceCode'  => 'BOM-' . str_pad((string)$row['id'], 5, '0', STR_PAD_LEFT),
        'contact_name'   => $row['contact_name'],
        'company_name'   => $row['company_name'],
        'business_email' => $row['business_email'],
        'phone'          => $row['phone'],
        'requirements'   => $row['requirements'],
        'has_bom_file'   => !empty($row['bom_filepath']),
        'bom_filename'   => $row['bom_filename'],
        'status'         => $row['status'],
        'submitted_at'   => $row['submitted_at'],
        'formatted_date' => date('d F Y, h:i A', $timestamp),
    ];

    sendJsonResponse(true, 'Submission details retrieved.', [
        'submission' => $submission
    ]);

} catch (Exception $e) {
    error_log("[FLUX Admin Submission Detail Error] " . $e->getMessage());
    sendJsonResponse(false, 'Failed to fetch submission details.', [], 500);
}
