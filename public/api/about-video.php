<?php
// Prevent PHP warnings/notices from corrupting JSON output
error_reporting(0);
ini_set('display_errors', '0');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept');
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

function getDbConnection($host, $port, $db, $user, $pass) {
    try {
        $dsn = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 5
        ]);
        return $pdo;
    } catch (Exception $e) {
        try {
            $dsn = "mysql:host=127.0.0.1;port={$port};dbname={$db};charset=utf8mb4";
            $pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5
            ]);
            return $pdo;
        } catch (Exception $e2) {
            return null;
        }
    }
}

$pdo = getDbConnection($dbHost, $dbPort, $dbName, $dbUser, $dbPass);

// Auto-migration helper: ensure column exists
if ($pdo) {
    try {
        $pdo->exec("ALTER TABLE `site_settings` ADD COLUMN IF NOT EXISTS `about_video_url` TEXT DEFAULT NULL AFTER `whatsapp`");
    } catch (Exception $e) {
        try {
            $pdo->exec("ALTER TABLE `site_settings` ADD `about_video_url` TEXT DEFAULT NULL");
        } catch (Exception $e2) {}
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? ($_POST['action'] ?? '');

// 1. GET: Fetch current about video URL
if ($method === 'GET') {
    if (!$pdo) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT about_video_url FROM site_settings WHERE id = 'default' LIMIT 1");
        $row = $stmt->fetch();
        $videoUrl = $row && !empty($row['about_video_url']) ? $row['about_video_url'] : null;
        echo json_encode(['success' => true, 'url' => $videoUrl]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// 2. DELETE or POST action=delete: Remove video
if ($method === 'DELETE' || ($method === 'POST' && $action === 'delete')) {
    if (!$pdo) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE site_settings SET about_video_url = NULL, updated_at = NOW() WHERE id = 'default'");
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Video removed successfully']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// 3. POST: Upload video file
if ($method === 'POST') {
    if (!$pdo) {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
        exit;
    }

    if (!isset($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
        $errorCode = $_FILES['video']['error'] ?? 'no_file';
        echo json_encode(['success' => false, 'error' => "File upload error code: {$errorCode}"]);
        exit;
    }

    $file = $_FILES['video'];
    $maxSize = 100 * 1024 * 1024; // 100MB
    if ($file['size'] > $maxSize) {
        echo json_encode(['success' => false, 'error' => 'Video file size must be less than 100MB']);
        exit;
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExts = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];
    if (!in_array($ext, $allowedExts)) {
        echo json_encode(['success' => false, 'error' => 'Allowed video formats: MP4, WebM, OGG, MOV']);
        exit;
    }

    // Target upload directory in Hostinger public_html: uploads/videos/
    $uploadDir = dirname(__DIR__) . '/uploads/videos/';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }
    if (!is_dir($uploadDir)) {
        $uploadDir = dirname(__DIR__, 2) . '/uploads/videos/';
        @mkdir($uploadDir, 0755, true);
    }

    $uniqueName = 'about_video_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $targetPath = $uploadDir . $uniqueName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode(['success' => false, 'error' => 'Failed to save uploaded video to permanent server storage']);
        exit;
    }

    // Construct public URL
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'magroupexport.com';
    $publicPath = '/uploads/videos/' . $uniqueName;
    $fullUrl = "{$protocol}://{$host}{$publicPath}";

    try {
        $stmt = $pdo->prepare("
            INSERT INTO site_settings (id, about_video_url, updated_at)
            VALUES ('default', :url, NOW())
            ON DUPLICATE KEY UPDATE about_video_url = :url, updated_at = NOW()
        ");
        $stmt->execute([':url' => $fullUrl]);

        echo json_encode([
            'success' => true,
            'url' => $fullUrl,
            'message' => 'Video uploaded and saved to MySQL successfully'
        ]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Uploaded file saved but database update failed: ' . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
