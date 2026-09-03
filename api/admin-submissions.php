<?php
/**
 * FLUX India - Admin Submissions Listing API
 * Returns paginated, searchable, filterable BOM submissions with summary statistics
 */

define('FLUX_APP', true);
require_once __DIR__ . '/db.php';

handleCors();

// Enforce session authentication
requireAdminAuth();

try {
    $pdo = getDbConnection();

    // -------------------------------------------------------------
    // 1. Fetch Global Summary Stats
    // -------------------------------------------------------------
    $statsQuery = "
        SELECT 
            COUNT(*) as total_count,
            SUM(CASE WHEN `status` = 'New' THEN 1 ELSE 0 END) as new_count,
            SUM(CASE WHEN `status` = 'Reviewed' THEN 1 ELSE 0 END) as reviewed_count,
            SUM(CASE WHEN `status` = 'Quoted' THEN 1 ELSE 0 END) as quoted_count,
            SUM(CASE WHEN `status` = 'Closed' THEN 1 ELSE 0 END) as closed_count
        FROM `bom_submissions`
    ";
    $statsStmt = $pdo->query($statsQuery);
    $statsRaw = $statsStmt->fetch();

    $stats = [
        'total'    => (int)($statsRaw['total_count'] ?? 0),
        'new'      => (int)($statsRaw['new_count'] ?? 0),
        'reviewed' => (int)($statsRaw['reviewed_count'] ?? 0),
        'quoted'   => (int)($statsRaw['quoted_count'] ?? 0),
        'closed'   => (int)($statsRaw['closed_count'] ?? 0),
    ];

    // -------------------------------------------------------------
    // 2. Parse Query Parameters
    // -------------------------------------------------------------
    $page   = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
    $limit  = isset($_GET['limit']) ? min(100, max(1, (int)$_GET['limit'])) : 20;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? trim($_GET['search']) : '';
    $status = isset($_GET['status']) ? trim($_GET['status']) : '';

    // -------------------------------------------------------------
    // 3. Build Filtered Query
    // -------------------------------------------------------------
    $whereClauses = [];
    $params = [];

    if (!empty($status) && in_array($status, ['New', 'Reviewed', 'Quoted', 'Closed'], true)) {
        $whereClauses[] = "`status` = :status";
        $params[':status'] = $status;
    }

    if (!empty($search)) {
        $whereClauses[] = "(
            `contact_name` LIKE :search_name OR
            `company_name` LIKE :search_comp OR
            `business_email` LIKE :search_email OR
            `phone` LIKE :search_phone OR
            `requirements` LIKE :search_req
        )";
        $searchTerm = '%' . $search . '%';
        $params[':search_name']  = $searchTerm;
        $params[':search_comp']  = $searchTerm;
        $params[':search_email'] = $searchTerm;
        $params[':search_phone'] = $searchTerm;
        $params[':search_req']   = $searchTerm;
    }

    $whereSql = '';
    if (!empty($whereClauses)) {
        $whereSql = 'WHERE ' . implode(' AND ', $whereClauses);
    }

    // Get total filtered count
    $countSql = "SELECT COUNT(*) as filtered_total FROM `bom_submissions` {$whereSql}";
    $countStmt = $pdo->prepare($countSql);
    $countStmt->execute($params);
    $totalFiltered = (int)$countStmt->fetchColumn();

    // -------------------------------------------------------------
    // 4. Fetch Paginated Records
    // -------------------------------------------------------------
    $dataSql = "
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
        {$whereSql}
        ORDER BY `submitted_at` DESC
        LIMIT {$offset}, {$limit}
    ";

    $dataStmt = $pdo->prepare($dataSql);
    $dataStmt->execute($params);
    $rows = $dataStmt->fetchAll();

    // Format records for clean UI rendering
    $submissions = array_map(function($row) {
        $timestamp = strtotime($row['submitted_at']);
        return [
            'id'             => (int)$row['id'],
            'referenceCode'  => 'BOM-' . str_pad((string)$row['id'], 5, '0', STR_PAD_LEFT),
            'contact_name'   => htmlspecialchars($row['contact_name'], ENT_QUOTES, 'UTF-8'),
            'company_name'   => htmlspecialchars($row['company_name'], ENT_QUOTES, 'UTF-8'),
            'business_email' => htmlspecialchars($row['business_email'], ENT_QUOTES, 'UTF-8'),
            'phone'          => htmlspecialchars($row['phone'], ENT_QUOTES, 'UTF-8'),
            'requirements'   => $row['requirements'], // Preserved raw for line-break display
            'has_bom_file'   => !empty($row['bom_filepath']),
            'bom_filename'   => $row['bom_filename'] ? htmlspecialchars($row['bom_filename'], ENT_QUOTES, 'UTF-8') : null,
            'status'         => $row['status'],
            'submitted_at'   => $row['submitted_at'],
            'formatted_date' => date('d M Y, h:i A', $timestamp),
        ];
    }, $rows);

    $totalPages = $totalFiltered > 0 ? (int)ceil($totalFiltered / $limit) : 1;

    sendJsonResponse(true, 'Submissions retrieved successfully.', [
        'stats'       => $stats,
        'pagination'  => [
            'page'          => $page,
            'limit'         => $limit,
            'totalFiltered' => $totalFiltered,
            'totalPages'    => $totalPages,
        ],
        'submissions' => $submissions,
    ]);

} catch (Exception $e) {
    error_log("[FLUX Admin Submissions Error] " . $e->getMessage());
    sendJsonResponse(false, 'Failed to fetch submissions.', [], 500);
}
