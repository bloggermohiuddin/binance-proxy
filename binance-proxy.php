<?php
$path = $_GET['path'] ?? '';
$query = $_GET['query'] ?? '';

if (!$path) {
    die(json_encode(['error' => 'Missing path parameter']));
}

$url = 'https://api.binance.com' . $path . ($query ? '?' . $query : '');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$headers = getallheaders();
if (isset($headers['X-MBX-APIKEY'])) {
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['X-MBX-APIKEY: ' . $headers['X-MBX-APIKEY']]);
}

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

header('Content-Type: application/json');
http_response_code($httpCode);
echo $response;
