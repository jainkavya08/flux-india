<?php
/**
 * FLUX India - BOM Submission API Endpoint
 * Accepts POST multipart/form-data from frontend BOM Upload Form
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

// Handle CORS
handleCors();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed. Only POST requests are supported.', [], 405);
}

// -------------------------------------------------------------
// 1. Extract & Sanitize Form Fields
// -------------------------------------------------------------
$contactName   = isset($_POST['contact_name']) ? trim($_POST['contact_name']) : (isset($_POST['name']) ? trim($_POST['name']) : '');
$companyName   = isset($_POST['company_name']) ? trim($_POST['company_name']) : (isset($_POST['company']) ? trim($_POST['company']) : '');
$businessEmail = isset($_POST['business_email']) ? trim($_POST['business_email']) : (isset($_POST['email']) ? trim($_POST['email']) : '');
$phone         = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$requirements  = isset($_POST['requirements']) ? trim($_POST['requirements']) : (isset($_POST['partNumbers']) ? trim($_POST['partNumbers']) : '');

// -------------------------------------------------------------
// 2. Validate Required Fields
// -------------------------------------------------------------
if (empty($contactName)) {
    sendJsonResponse(false, 'Contact Name is required.', ['field' => 'contact_name'], 400);
}

if (strlen($contactName) > 150) {
    sendJsonResponse(false, 'Contact Name is too long (maximum 150 characters).', ['field' => 'contact_name'], 400);
}

if (empty($companyName)) {
    sendJsonResponse(false, 'Company or Panel Shop name is required.', ['field' => 'company_name'], 400);
}

if (strlen($companyName) > 200) {
    sendJsonResponse(false, 'Company name is too long (maximum 200 characters).', ['field' => 'company_name'], 400);
}

if (empty($businessEmail)) {
    sendJsonResponse(false, 'Business Email is required.', ['field' => 'business_email'], 400);
}

if (!filter_var($businessEmail, FILTER_VALIDATE_EMAIL) || strlen($businessEmail) > 255) {
    sendJsonResponse(false, 'Please provide a valid business email address.', ['field' => 'business_email'], 400);
}

if (empty($phone)) {
    sendJsonResponse(false, 'Phone / Mobile number is required.', ['field' => 'phone'], 400);
}

if (strlen($phone) > 50) {
    sendJsonResponse(false, 'Phone number is too long (maximum 50 characters).', ['field' => 'phone'], 400);
}

if (empty($requirements)) {
    sendJsonResponse(false, 'Please provide component part numbers, quantities, or BOM requirements.', ['field' => 'requirements'], 400);
}

if (strlen($requirements) > 20000) {
    sendJsonResponse(false, 'Requirements text is too long (maximum 20,000 characters).', ['field' => 'requirements'], 400);
}

// -------------------------------------------------------------
// 3. Handle File Upload (Optional BOM attachment)
// -------------------------------------------------------------
$bomOriginalFilename = null;
$bomStoredFilepath   = null;

$uploadDir = defined('UPLOAD_DIR') ? UPLOAD_DIR : dirname(__DIR__) . '/uploads/bom/';
$maxFileSize = defined('MAX_FILE_SIZE') ? MAX_FILE_SIZE : 10 * 1024 * 1024; // 10MB

if (isset($_FILES['bom_file']) && $_FILES['bom_file']['error'] !== UPLOAD_ERR_NO_FILE) {
    $fileError    = $_FILES['bom_file']['error'];
    $fileTmpName  = $_FILES['bom_file']['tmp_name'];
    $fileSize     = $_FILES['bom_file']['size'];
    $rawFilename  = $_FILES['bom_file']['name'];

    // Check for upload error codes
    if ($fileError !== UPLOAD_ERR_OK) {
        $errorMessage = 'File upload failed.';
        switch ($fileError) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $errorMessage = 'The uploaded file exceeds the 10 MB limit.';
                break;
            case UPLOAD_ERR_PARTIAL:
                $errorMessage = 'The file was only partially uploaded. Please try again.';
                break;
            default:
                $errorMessage = 'Error saving uploaded file.';
                break;
        }
        sendJsonResponse(false, $errorMessage, ['field' => 'bom_file'], 400);
    }

    // Check file size
    if ($fileSize > $maxFileSize) {
        sendJsonResponse(false, 'File is too large. Maximum allowed size is 10 MB.', ['field' => 'bom_file'], 400);
    }

    // Sanitize filename & extract extension
    $safeOriginalName = basename($rawFilename);
    $extension = strtolower(pathinfo($safeOriginalName, PATHINFO_EXTENSION));

    // Strictly whitelist allowed extensions
    $allowedExtensions = ['pdf', 'csv', 'xls', 'xlsx', 'txt'];
    if (!in_array($extension, $allowedExtensions, true)) {
        sendJsonResponse(false, 'Invalid file type. Allowed formats: PDF, CSV, Excel (.xls, .xlsx), and TXT.', ['field' => 'bom_file'], 400);
    }

    // Explicitly reject dangerous executable extensions
    $dangerousExtensions = [
        'php', 'php3', 'php4', 'php5', 'phtml', 'phar', 'inc', 'exe', 'sh', 'bash',
        'js', 'html', 'htm', 'shtml', 'svg', 'zip', 'rar', 'tar', 'gz', 'cgi', 'pl', 'py'
    ];
    if (in_array($extension, $dangerousExtensions, true)) {
        sendJsonResponse(false, 'This file type is not allowed for security reasons.', ['field' => 'bom_file'], 400);
    }

    // MIME type verification
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $detectedMime = finfo_file($finfo, $fileTmpName);
        finfo_close($finfo);

        $allowedMimes = [
            'application/pdf',
            'text/csv',
            'text/plain',
            'application/vnd.ms-excel',
            'application/msexcel',
            'application/x-msexcel',
            'application/x-ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/octet-stream', // Often sent by browsers for Excel/CSV
        ];

        if (!in_array($detectedMime, $allowedMimes, true)) {
            // Log for inspection
            error_log("[FLUX Upload Warning] MIME mismatch for file: {$safeOriginalName}, detected: {$detectedMime}");
        }
    }

    // Ensure upload directory exists
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            error_log("[FLUX Upload Error] Failed to create upload directory: {$uploadDir}");
            sendJsonResponse(false, 'Server upload folder could not be prepared.', [], 500);
        }
    }

    // Ensure upload directory is protected with .htaccess
    $htaccessPath = $uploadDir . '.htaccess';
    if (!file_exists($htaccessPath)) {
        $htaccessContent = "# Deny direct access to uploaded customer files\n"
                         . "<IfModule authz_core_module>\n    Require all denied\n</IfModule>\n"
                         . "<IfModule !authz_core_module>\n    Deny from all\n</IfModule>\n"
                         . "Options -Indexes -ExecCGI\n"
                         . "RemoveHandler .php .phtml .php3 .php4 .php5 .phar\n"
                         . "php_flag engine off\n";
        @file_put_contents($htaccessPath, $htaccessContent);
    }

    // Generate random secure unique stored filename
    $randomHex = bin2hex(random_bytes(16));
    $storedFilename = $randomHex . '_' . time() . '.' . $extension;
    $targetFilePath = $uploadDir . $storedFilename;

    if (!move_uploaded_file($fileTmpName, $targetFilePath)) {
        error_log("[FLUX Upload Error] move_uploaded_file failed for: {$targetFilePath}");
        sendJsonResponse(false, 'Failed to store uploaded BOM file on the server.', [], 500);
    }

    // Store references
    $bomOriginalFilename = $safeOriginalName;
    $bomStoredFilepath   = $storedFilename;
}

// -------------------------------------------------------------
// 4. Insert Submission into MySQL
// -------------------------------------------------------------
try {
    $pdo = getDbConnection();

    $stmt = $pdo->prepare("
        INSERT INTO `bom_submissions` (
            `contact_name`,
            `company_name`,
            `business_email`,
            `phone`,
            `requirements`,
            `bom_filename`,
            `bom_filepath`,
            `submitted_at`,
            `status`
        ) VALUES (
            :contact_name,
            :company_name,
            :business_email,
            :phone,
            :requirements,
            :bom_filename,
            :bom_filepath,
            NOW(),
            'New'
        )
    ");

    $stmt->execute([
        ':contact_name'   => $contactName,
        ':company_name'   => $companyName,
        ':business_email' => $businessEmail,
        ':phone'          => $phone,
        ':requirements'   => $requirements,
        ':bom_filename'   => $bomOriginalFilename,
        ':bom_filepath'   => $bomStoredFilepath,
    ]);

    $submissionId = (int)$pdo->lastInsertId();
    $referenceCode = 'BOM-' . str_pad((string)$submissionId, 5, '0', STR_PAD_LEFT);

    // -------------------------------------------------------------
    // 5. Send Admin Notification Email (Optional / Fail-safe)
    // -------------------------------------------------------------
    $adminEmail = defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'sales@fluxindia.in';
    $fromEmail  = defined('FROM_EMAIL') ? FROM_EMAIL : 'noreply@fluxindia.rf.gd';

    if (!empty($adminEmail)) {
        try {
            $subject = "New BOM Request #{$referenceCode} - {$companyName}";
            
            $message = "==================================================\n";
            $message .= " FLUX INDIA - NEW BOM INTAKE SUBMISSION\n";
            $message .= " Reference: #{$referenceCode} (ID: {$submissionId})\n";
            $message .= " Date: " . date('d M Y, h:i A') . "\n";
            $message .= "==================================================\n\n";
            $message .= "CONTACT DETAILS:\n";
            $message .= "Contact Name:  {$contactName}\n";
            $message .= "Company Name:  {$companyName}\n";
            $message .= "Email:         {$businessEmail}\n";
            $message .= "Phone:         {$phone}\n\n";
            $message .= "ATTACHED BOM FILE:\n";
            $message .= ($bomOriginalFilename ? "{$bomOriginalFilename} (Uploaded to server)" : "None") . "\n\n";
            $message .= "LINE-ITEM REQUIREMENTS / PART NUMBERS:\n";
            $message .= "--------------------------------------------------\n";
            $message .= $requirements . "\n";
            $message .= "--------------------------------------------------\n\n";
            $message .= "Manage this inquiry in the Admin Panel:\n";
            $message .= "https://fluxindia.rf.gd/admin/\n";

            $headers = "From: FLUX India System <{$fromEmail}>\r\n"
                     . "Reply-To: {$businessEmail}\r\n"
                     . "X-Mailer: PHP/" . phpversion();

            @mail($adminEmail, $subject, $message, $headers);
        } catch (Exception $mailEx) {
            // Log but do not fail the customer submission
            error_log("[FLUX Email Notice] " . $mailEx->getMessage());
        }
    }

    // -------------------------------------------------------------
    // 6. Return JSON Success Response
    // -------------------------------------------------------------
    sendJsonResponse(true, 'Your BOM has been submitted successfully. Our engineering team will review it and deliver your consolidated quotation within 24 hours.', [
        'id'              => $submissionId,
        'referenceNumber' => $referenceCode,
        'submissionId'    => $submissionId,
    ], 200);

} catch (Exception $e) {
    error_log("[FLUX BOM Submission Error] " . $e->getMessage());
    sendJsonResponse(false, 'An error occurred while saving your BOM submission. Please retry or contact our Pune sales desk directly on WhatsApp.', [], 500);
}
