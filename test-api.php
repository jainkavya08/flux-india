<?php
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['HTTP_ORIGIN'] = 'http://localhost:3000';
$ch = curl_init('http://localhost:8000/api/track-bom.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["companyName" => "Test", "bomId" => "BOM-00001"]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if (curl_errno($ch)) {
    echo "cURL Error: " . curl_error($ch) . "\n";
}
echo "HTTP Code: " . $http_code . "\n";
echo "Response: " . $response . "\n";
