<?php
// Prevent warnings from polluting JSON
error_reporting(0);
ini_set('display_errors', '0');

// Set headers for CORS and JSON
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbHost = getenv('DATABASE_HOST') ?: 'srv2056.hstgr.io';
$dbPort = getenv('DATABASE_PORT') ?: '3306';
$dbName = getenv('DATABASE_NAME') ?: 'u763339026_magroup';
$dbUser = getenv('DATABASE_USER') ?: 'u763339026_magroup';
$dbPass = getenv('DATABASE_PASSWORD') ?: 'MaGroup2026!DbSecure';

function getDbConnection($host, $port, $name, $user, $pass) {
    $hosts = [$host, '127.0.0.1', 'localhost'];
    foreach ($hosts as $h) {
        try {
            $dsn = "mysql:host={$h};port={$port};dbname={$name};charset=utf8mb4";
            $pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5
            ]);
            return $pdo;
        } catch (Exception $e) {
            // try next
        }
    }
    return null;
}

$pdo = getDbConnection($dbHost, $dbPort, $dbName, $dbUser, $dbPass);

// Auto-migrate column if needed
if ($pdo) {
    try {
        $pdo->exec("ALTER TABLE `site_settings` ADD COLUMN IF NOT EXISTS `about_video_url` TEXT DEFAULT NULL;");
    } catch (Exception $e) {
        try {
            $pdo->exec("ALTER TABLE `site_settings` ADD `about_video_url` TEXT DEFAULT NULL;");
        } catch (Exception $e2) {}
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

// 1. GET: Retrieve current video URL
if ($method === 'GET') {
    $videoUrl = null;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT about_video_url FROM site_settings WHERE id = 'default' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['about_video_url'])) {
                $videoUrl = $row['about_video_url'];
            }
        } catch (Exception $e) {}
    }

    if (!$videoUrl) {
        $staticFile = __DIR__ . '/../uploads/videos/about-us.mp4';
        if (file_exists($staticFile)) {
            $videoUrl = '/uploads/videos/about-us.mp4';
        }
    }

    echo json_encode(['success' => true, 'url' => $videoUrl]);
    exit;
}

// 2. DELETE
if ($method === 'DELETE' || ($method === 'POST' && $action === 'delete')) {
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("UPDATE site_settings SET about_video_url = NULL WHERE id = 'default'");
            $stmt->execute();
        } catch (Exception $e) {}
    }

    echo json_encode(['success' => true, 'url' => null]);
    exit;
}

// 3. POST: Upload new video
if ($method === 'POST') {
    if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
        $code = isset($_FILES['video']) ? $_FILES['video']['error'] : 'no_file';
        echo json_encode(['success' => false, 'error' => 'Upload failed or no file provided (code: ' . $code . ')']);
        exit;
    }

    $file = $_FILES['video'];
    $allowedMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    $fileMime = mime_content_type($file['tmp_name']);
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, ['mp4', 'webm', 'mov']) && !in_array($fileMime, $allowedMimes)) {
        echo json_encode(['success' => false, 'error' => 'Invalid file format. Please upload an MP4 or WebM video.']);
        exit;
    }

    if ($file['size'] > 100 * 1024 * 1024) {
        echo json_encode(['success' => false, 'error' => 'Video size exceeds 100MB limit.']);
        exit;
    }

    $uploadDir = __DIR__ . '/../uploads/videos';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = 'about-video-' . time() . '.' . ($ext === 'webm' ? 'webm' : 'mp4');
    $targetPath = $uploadDir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode(['success' => false, 'error' => 'Failed to save uploaded video to server disk.']);
        exit;
    }

    $publicUrl = '/uploads/videos/' . $filename;

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO site_settings (id, about_video_url) VALUES ('default', :url) ON DUPLICATE KEY UPDATE about_video_url = VALUES(about_video_url)");
            $stmt->execute([':url' => $publicUrl]);
        } catch (Exception $e) {}
    }

    echo json_encode(['success' => true, 'url' => $publicUrl]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
