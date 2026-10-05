<?php
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['HTTP_ORIGIN'] = 'http://localhost:3000';
// Mock php://input
$json = json_encode(["companyName" => "testing", "bomId" => "BOM-00012"]);
file_put_contents('php://input', $json);
// We can't actually override php://input like that.
// Let's use an actual HTTP request with built-in server.
