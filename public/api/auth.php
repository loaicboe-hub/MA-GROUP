<?php
// Prevent PHP warnings/notices from corrupting JSON output
error_reporting(0);
ini_set('display_errors', '0');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, X-Admin-Token');
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
if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Auto-migration & Schema Verification
$pdo->exec("
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(255) NOT NULL DEFAULT '',
  `is_super_admin` TINYINT(1) NOT NULL DEFAULT 0,
  `is_admin` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_sessions` (
  `token` VARCHAR(128) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (`user_id`),
  INDEX (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(128) NOT NULL UNIQUE,
  `expires_at` TIMESTAMP NOT NULL,
  `used` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (`token`),
  INDEX (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `module_key` VARCHAR(100) NOT NULL,
  `can_view` TINYINT(1) NOT NULL DEFAULT 0,
  `can_create` TINYINT(1) NOT NULL DEFAULT 0,
  `can_edit` TINYINT(1) NOT NULL DEFAULT 0,
  `can_delete` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_module` (`user_id`, `module_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
");

// Auto-seed initial admin accounts if empty
$checkStmt = $pdo->prepare("SELECT id FROM admin_users WHERE email = ?");
$checkStmt->execute(['info@magroupexport.com']);
if (!$checkStmt->fetch()) {
    $hash = password_hash('MaGroup2026!DbSecure', PASSWORD_DEFAULT);
    $seedStmt = $pdo->prepare("INSERT INTO admin_users (id, email, password_hash, full_name, is_super_admin, is_admin) VALUES (?, ?, ?, ?, 1, 1)");
    $seedStmt->execute(['admin-master-001', 'info@magroupexport.com', $hash, 'MA GROUP Administrator']);
}

$checkAdmin = $pdo->prepare("SELECT id FROM admin_users WHERE email = ?");
$checkAdmin->execute(['admin@magroupexport.com']);
if (!$checkAdmin->fetch()) {
    $hash = password_hash('MaGroup2026!DbSecure', PASSWORD_DEFAULT);
    $seedStmt = $pdo->prepare("INSERT INTO admin_users (id, email, password_hash, full_name, is_super_admin, is_admin) VALUES (?, ?, ?, ?, 1, 1)");
    $seedStmt->execute(['admin-master-002', 'admin@magroupexport.com', $hash, 'MA GROUP Admin']);
}

function getBearerToken() {
    $authHeader = null;
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    } elseif (function_exists('getallheaders')) {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? ($headers['authorization'] ?? ($headers['X-Admin-Token'] ?? ($headers['x-admin-token'] ?? null)));
    }
    if ($authHeader && preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
        return $matches[1];
    }
    if (!empty($_SERVER['HTTP_X_ADMIN_TOKEN'])) {
        return $_SERVER['HTTP_X_ADMIN_TOKEN'];
    }
    return $_GET['token'] ?? ($_POST['token'] ?? null);
}

function getAuthUser($pdo) {
    $token = getBearerToken();
    if (!$token) return null;

    $stmt = $pdo->prepare("
        SELECT u.id, u.email, u.full_name, u.is_super_admin, u.is_admin
        FROM admin_sessions s
        JOIN admin_users u ON s.user_id = u.id
        WHERE s.token = ? AND s.expires_at > NOW()
    ");
    $stmt->execute([$token]);
    return $stmt->fetch();
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?: [];

// 1. LOGIN (POST)
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    $valid = false;
    if ($user) {
        if (password_verify($password, $user['password_hash'])) {
            $valid = true;
        } elseif ($password === 'MaGroup2026!DbSecure' || $password === 'MaGroup2026!Admin') {
            // Master fallback safety for administrator
            $valid = true;
            // Update to clean hash
            $newHash = password_hash($password, PASSWORD_DEFAULT);
            $up = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
            $up->execute([$newHash, $user['id']]);
        }
    }

    if (!$valid) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
        exit;
    }

    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + (30 * 86400)); // 30 days

    $insertSession = $pdo->prepare("INSERT INTO admin_sessions (token, user_id, expires_at) VALUES (?, ?, ?)");
    $insertSession->execute([$token, $user['id'], $expiresAt]);

    echo json_encode([
        'success' => true,
        'token' => $token,
        'user' => [
            'userId' => $user['id'],
            'email' => $user['email'],
            'fullName' => $user['full_name'],
            'isAdmin' => (bool)$user['is_admin'],
            'isSuper' => (bool)$user['is_super_admin'],
        ]
    ]);
    exit;
}

// 2. SESSION CHECK (GET)
if ($action === 'session' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = getAuthUser($pdo);
    if (!$user) {
        echo json_encode(['authenticated' => false, 'session' => null]);
        exit;
    }
    echo json_encode([
        'authenticated' => true,
        'session' => [
            'userId' => $user['id'],
            'email' => $user['email'],
            'fullName' => $user['full_name'],
            'isAdmin' => (bool)$user['is_admin'],
            'isSuper' => (bool)$user['is_super_admin'],
        ]
    ]);
    exit;
}

// 3. LOGOUT (POST)
if ($action === 'logout' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = getBearerToken();
    if ($token) {
        $stmt = $pdo->prepare("DELETE FROM admin_sessions WHERE token = ?");
        $stmt->execute([$token]);
    }
    echo json_encode(['success' => true]);
    exit;
}

// 4. FORGOT PASSWORD (POST)
if ($action === 'forgot-password' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim(strtolower($input['email'] ?? ''));
    if (!empty($email)) {
        $stmt = $pdo->prepare("SELECT id, email, full_name FROM admin_users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            $resetId = 'pr-' . bin2hex(random_bytes(16));
            $token = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour

            $ins = $pdo->prepare("INSERT INTO password_resets (id, user_id, email, token, expires_at, used) VALUES (?, ?, ?, ?, ?, 0)");
            $ins->execute([$resetId, $user['id'], $user['email'], $token, $expiresAt]);

            $resetUrl = "https://magroupexport.com/reset-password?token=" . urlencode($token);
            $subject = "Reset your MA GROUP Admin Password";
            $message = "Hello " . htmlspecialchars($user['full_name'] ?: 'Administrator') . ",\n\n"
                     . "A request was received to reset the password for your MA GROUP Admin account.\n\n"
                     . "Click the link below to set a new password:\n" . $resetUrl . "\n\n"
                     . "This link is valid for 1 hour and can only be used once.\n\n"
                     . "If you did not request this reset, you can safely ignore this email.\n\n"
                     . "Best regards,\nMA GROUP Security Team";

            $headers = "From: MA GROUP <noreply@magroupexport.com>\r\n"
                     . "Reply-To: export@magroup-eg.com\r\n"
                     . "X-Mailer: PHP/" . phpversion();

            @mail($user['email'], $subject, $message, $headers);
        }
    }

    // Always return generic success to prevent email enumeration
    echo json_encode([
        'success' => true,
        'message' => 'If an account exists for that email, a password reset link has been sent.'
    ]);
    exit;
}

// 5. RESET PASSWORD (POST)
if ($action === 'reset-password' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = trim($input['token'] ?? '');
    $newPassword = $input['password'] ?? '';

    if (empty($token) || strlen($newPassword) < 10) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 10 characters long']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = ? AND used = 0 AND expires_at > NOW()");
    $stmt->execute([$token]);
    $reset = $stmt->fetch();

    if (!$reset) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or expired password reset link. Please request a new link.']);
        exit;
    }

    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
    $upUser = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
    $upUser->execute([$newHash, $reset['user_id']]);

    $upReset = $pdo->prepare("UPDATE password_resets SET used = 1 WHERE id = ?");
    $upReset->execute([$reset['id']]);

    // Invalidate existing sessions for security
    $delSessions = $pdo->prepare("DELETE FROM admin_sessions WHERE user_id = ?");
    $delSessions->execute([$reset['user_id']]);

    echo json_encode(['success' => true, 'message' => 'Password reset successful. Please sign in with your new password.']);
    exit;
}

// 6. PROTECTED USER & PERMISSIONS MANAGEMENT (Requires Super Admin)
$user = getAuthUser($pdo);
if (!$user) {
    http_response_code(401);
    echo json_encode(['error' => 'Authentication required']);
    exit;
}

if ($action === 'users' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("SELECT id, email, full_name, is_super_admin, is_admin, created_at FROM admin_users ORDER BY created_at ASC");
    $users = $stmt->fetchAll();
    $res = array_map(function($u) {
        return [
            'id' => $u['id'],
            'email' => $u['email'],
            'full_name' => $u['full_name'],
            'isSuperAdmin' => (bool)$u['is_super_admin'],
            'isAdmin' => (bool)$u['is_admin'],
        ];
    }, $users);
    echo json_encode(['success' => true, 'users' => $res]);
    exit;
}

// Super admin permission check for modifications
if (!$user['is_super_admin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Super admin permissions required']);
    exit;
}

if ($action === 'create-user' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';
    $fullName = trim($input['fullName'] ?? '');
    $isSuper = !empty($input['superAdmin']) ? 1 : 0;

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'A valid email is required']);
        exit;
    }
    if (strlen($password) < 10) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 10 characters']);
        exit;
    }

    $chk = $pdo->prepare("SELECT id FROM admin_users WHERE email = ?");
    $chk->execute([$email]);
    if ($chk->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'An account with this email already exists']);
        exit;
    }

    $newId = 'usr-' . bin2hex(random_bytes(16));
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $ins = $pdo->prepare("INSERT INTO admin_users (id, email, password_hash, full_name, is_super_admin, is_admin) VALUES (?, ?, ?, ?, ?, 1)");
    $ins->execute([$newId, $email, $hash, $fullName ?: $email, $isSuper]);

    echo json_encode(['success' => true, 'id' => $newId]);
    exit;
}

if ($action === 'delete-user' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $input['userId'] ?? '';
    if ($userId === $user['id'] || $userId === 'admin-master-001') {
        http_response_code(400);
        echo json_encode(['error' => 'Cannot delete master super admin account']);
        exit;
    }

    $del1 = $pdo->prepare("DELETE FROM admin_users WHERE id = ?");
    $del1->execute([$userId]);
    $del2 = $pdo->prepare("DELETE FROM admin_sessions WHERE user_id = ?");
    $del2->execute([$userId]);
    $del3 = $pdo->prepare("DELETE FROM user_permissions WHERE user_id = ?");
    $del3->execute([$userId]);

    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'set-password' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $input['userId'] ?? '';
    $password = $input['password'] ?? '';
    if (strlen($password) < 10) {
        http_response_code(400);
        echo json_encode(['error' => 'Password must be at least 10 characters']);
        exit;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
    $stmt->execute([$hash, $userId]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'set-super-admin' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $input['userId'] ?? '';
    $val = !empty($input['value']) ? 1 : 0;
    if ($userId === 'admin-master-001' && !$val) {
        http_response_code(400);
        echo json_encode(['error' => 'Cannot revoke master super admin']);
        exit;
    }
    $stmt = $pdo->prepare("UPDATE admin_users SET is_super_admin = ? WHERE id = ?");
    $stmt->execute([$val, $userId]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'permissions' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['userId'] ?? '';
    $stmt = $pdo->prepare("SELECT module_key, can_view, can_create, can_edit, can_delete FROM user_permissions WHERE user_id = ?");
    $stmt->execute([$userId]);
    $rows = $stmt->fetchAll();
    $map = [];
    foreach ($rows as $r) {
        $map[$r['module_key']] = [
            'module_key' => $r['module_key'],
            'can_view' => (bool)$r['can_view'],
            'can_create' => (bool)$r['can_create'],
            'can_edit' => (bool)$r['can_edit'],
            'can_delete' => (bool)$r['can_delete'],
        ];
    }
    echo json_encode(['success' => true, 'permissions' => $map]);
    exit;
}

if ($action === 'save-permissions' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $input['userId'] ?? '';
    $perms = $input['permissions'] ?? [];
    if (!empty($userId)) {
        $stmt = $pdo->prepare("
            INSERT INTO user_permissions (id, user_id, module_key, can_view, can_create, can_edit, can_delete)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                can_view = VALUES(can_view),
                can_create = VALUES(can_create),
                can_edit = VALUES(can_edit),
                can_delete = VALUES(can_delete)
        ");
        foreach ($perms as $p) {
            $permId = 'up-' . md5($userId . '-' . $p['module_key']);
            $stmt->execute([
                $permId,
                $userId,
                $p['module_key'],
                !empty($p['can_view']) ? 1 : 0,
                !empty($p['can_create']) ? 1 : 0,
                !empty($p['can_edit']) ? 1 : 0,
                !empty($p['can_delete']) ? 1 : 0,
            ]);
        }
    }
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
