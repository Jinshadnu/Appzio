<?php
/**
 * APPZIO REST API Router & Controller
 * Clean, high-performance PHP REST API for APPZIO Digital Agency
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/auth.php';

// Parse Request URI and Method
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Strip '/api' prefix and trailing slash
$path = preg_replace('#^/api#', '', $requestUri);
$path = trim($path, '/');
$segments = $path !== '' ? explode('/', $path) : [];

// Parse JSON Body & Form POST
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?? [];
if (empty($input) && !empty($_POST)) {
    $input = $_POST;
}

// Helper Response Functions
function jsonSuccess($data, string $message = 'Success', int $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => true, 'message' => $message, 'data' => $data]);
    exit;
}

function jsonError(string $message = 'Error', int $code = 400, $errors = null) {
    http_response_code($code);
    echo json_encode(['success' => false, 'message' => $message, 'errors' => $errors]);
    exit;
}

$pdo = Database::getConnection();

// --- ROUTER ---

try {
    // 1. HEALTH CHECK / ROOT
    if (empty($segments)) {
        jsonSuccess(['version' => '1.0.0', 'service' => 'APPZIO API', 'time' => date('Y-m-d H:i:s')]);
    }

    $resource = $segments[0] ?? '';
    $idOrSub = $segments[1] ?? null;
    $action = $segments[2] ?? null;

    // 2. AUTHENTICATION ENDPOINTS (/auth/...)
    if ($resource === 'auth') {
        if ($idOrSub === 'login' && $method === 'POST') {
            $email = trim($input['email'] ?? '');
            $password = trim($input['password'] ?? '');

            if (!$email || !$password) {
                jsonError('Please provide both email and password.');
            }

            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password'])) {
                jsonError('Invalid email or password.', 401);
            }

            $token = Auth::createToken([
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ]);

            jsonSuccess([
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ], 'Login successful.');
        }

        if ($idOrSub === 'me' && $method === 'GET') {
            $authUser = Auth::requireAdmin();
            $stmt = $pdo->prepare("SELECT id, name, email, role, created_at FROM users WHERE id = ?");
            $stmt->execute([$authUser['id']]);
            $userData = $stmt->fetch();
            if (!$userData) jsonError('User not found', 404);
            jsonSuccess($userData);
        }

        if ($idOrSub === 'profile' && $method === 'PUT') {
            $authUser = Auth::requireAdmin();
            $name = trim($input['name'] ?? '');
            $email = trim($input['email'] ?? '');
            $currentPassword = $input['current_password'] ?? '';
            $newPassword = $input['new_password'] ?? '';

            if (!$name || !$email) {
                jsonError('Name and email are required.');
            }

            // If changing password, verify current password
            if (!empty($newPassword)) {
                $stmt = $pdo->prepare("SELECT password FROM users WHERE id = ?");
                $stmt->execute([$authUser['id']]);
                $user = $stmt->fetch();

                if (!$user || !password_verify($currentPassword, $user['password'])) {
                    jsonError('Current password does not match.', 400);
                }

                $hashed = password_hash($newPassword, PASSWORD_BCRYPT);
                $updateStmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                $updateStmt->execute([$name, $email, $hashed, $authUser['id']]);
            } else {
                $updateStmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
                $updateStmt->execute([$name, $email, $authUser['id']]);
            }

            jsonSuccess(['name' => $name, 'email' => $email], 'Profile updated successfully.');
        }

        jsonError('Auth endpoint not found', 404);
    }

    // 3. SETTINGS ENDPOINTS (/settings)
    if ($resource === 'settings') {
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT setting_key, setting_value FROM settings");
            $rows = $stmt->fetchAll();
            $settings = [];
            foreach ($rows as $row) {
                $settings[$row['setting_key']] = $row['setting_value'];
            }
            jsonSuccess($settings);
        }

        if ($method === 'PUT' || $method === 'POST') {
            Auth::requireAdmin();
            if (!is_array($input)) {
                jsonError('Invalid settings payload');
            }

            $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) 
                ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = CURRENT_TIMESTAMP");
            
            // SQLite compatibility check
            $isSqlite = ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'sqlite');
            if ($isSqlite) {
                $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) 
                    ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value, updated_at = CURRENT_TIMESTAMP");
            }

            foreach ($input as $k => $v) {
                if (is_array($v)) $v = json_encode($v);
                $stmt->execute([$k, (string)$v]);
            }

            jsonSuccess(null, 'Settings updated successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 4. PROJECTS ENDPOINTS (/projects)
    if ($resource === 'projects') {
        if ($method === 'GET') {
            if ($idOrSub && !in_array($idOrSub, ['featured', 'categories'])) {
                // Get single project by slug or ID
                $stmt = $pdo->prepare("SELECT * FROM projects WHERE slug = ? OR id = ? LIMIT 1");
                $stmt->execute([$idOrSub, $idOrSub]);
                $project = $stmt->fetch();
                if (!$project) jsonError('Project not found', 404);

                $project['key_features'] = json_decode($project['key_features'] ?? '[]', true);
                $project['technologies'] = json_decode($project['technologies'] ?? '[]', true);
                $project['gallery_images'] = json_decode($project['gallery_images'] ?? '[]', true);

                jsonSuccess($project);
            }

            // List projects
            $category = $_GET['category'] ?? null;
            $featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
            $all = isset($_GET['all']) && $_GET['all'] === 'true';

            $sql = "SELECT * FROM projects WHERE 1=1";
            $params = [];

            if (!$all) {
                $sql .= " AND is_published = 1";
            }
            if ($category && $category !== 'All') {
                $sql .= " AND category = ?";
                $params[] = $category;
            }
            if ($featured !== null) {
                $sql .= " AND is_featured = ?";
                $params[] = $featured;
            }

            $sql .= " ORDER BY display_order ASC, created_at DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $projects = $stmt->fetchAll();

            foreach ($projects as &$p) {
                $p['key_features'] = json_decode($p['key_features'] ?? '[]', true);
                $p['technologies'] = json_decode($p['technologies'] ?? '[]', true);
                $p['gallery_images'] = json_decode($p['gallery_images'] ?? '[]', true);
            }

            jsonSuccess($projects);
        }

        if ($method === 'POST') {
            Auth::requireAdmin();
            $title = trim($input['title'] ?? '');
            $category = trim($input['category'] ?? 'Websites');
            $slug = trim($input['slug'] ?? '');
            if (!$slug) {
                $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
            }

            $stmt = $pdo->prepare("INSERT INTO projects (
                title, slug, category, client, tagline, short_description, overview,
                objectives, challenges, solutions, key_features, technologies,
                thumbnail, cover_image, gallery_images, live_url, play_store_url, app_store_url,
                is_featured, is_published, display_order
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->execute([
                $title,
                $slug,
                $category,
                $input['client'] ?? '',
                $input['tagline'] ?? '',
                $input['short_description'] ?? '',
                $input['overview'] ?? '',
                $input['objectives'] ?? '',
                $input['challenges'] ?? '',
                $input['solutions'] ?? '',
                json_encode($input['key_features'] ?? []),
                json_encode($input['technologies'] ?? []),
                $input['thumbnail'] ?? '',
                $input['cover_image'] ?? '',
                json_encode($input['gallery_images'] ?? []),
                $input['live_url'] ?? '',
                $input['play_store_url'] ?? '',
                $input['app_store_url'] ?? '',
                isset($input['is_featured']) ? (int)$input['is_featured'] : 0,
                isset($input['is_published']) ? (int)$input['is_published'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0
            ]);

            $id = $pdo->lastInsertId();
            jsonSuccess(['id' => $id, 'slug' => $slug], 'Project created successfully.', 201);
        }

        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $title = trim($input['title'] ?? '');
            $category = trim($input['category'] ?? '');
            $slug = trim($input['slug'] ?? '');

            $stmt = $pdo->prepare("UPDATE projects SET
                title = ?, slug = ?, category = ?, client = ?, tagline = ?,
                short_description = ?, overview = ?, objectives = ?, challenges = ?,
                solutions = ?, key_features = ?, technologies = ?, thumbnail = ?,
                cover_image = ?, gallery_images = ?, live_url = ?, play_store_url = ?,
                app_store_url = ?, is_featured = ?, is_published = ?, display_order = ?,
                updated_at = CURRENT_TIMESTAMP
                WHERE id = ?");

            $stmt->execute([
                $title,
                $slug,
                $category,
                $input['client'] ?? '',
                $input['tagline'] ?? '',
                $input['short_description'] ?? '',
                $input['overview'] ?? '',
                $input['objectives'] ?? '',
                $input['challenges'] ?? '',
                $input['solutions'] ?? '',
                json_encode($input['key_features'] ?? []),
                json_encode($input['technologies'] ?? []),
                $input['thumbnail'] ?? '',
                $input['cover_image'] ?? '',
                json_encode($input['gallery_images'] ?? []),
                $input['live_url'] ?? '',
                $input['play_store_url'] ?? '',
                $input['app_store_url'] ?? '',
                isset($input['is_featured']) ? (int)$input['is_featured'] : 0,
                isset($input['is_published']) ? (int)$input['is_published'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0,
                $idOrSub
            ]);

            jsonSuccess(null, 'Project updated successfully.');
        }

        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'Project deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 5. SERVICES ENDPOINTS (/services)
    if ($resource === 'services') {
        if ($method === 'GET') {
            $all = isset($_GET['all']) && $_GET['all'] === 'true';
            $sql = "SELECT * FROM services" . ($all ? "" : " WHERE is_active = 1") . " ORDER BY display_order ASC, id ASC";
            $stmt = $pdo->query($sql);
            $services = $stmt->fetchAll();
            foreach ($services as &$s) {
                $s['features'] = json_decode($s['features'] ?? '[]', true);
                $s['technologies'] = json_decode($s['technologies'] ?? '[]', true);
            }
            jsonSuccess($services);
        }

        if ($method === 'POST') {
            Auth::requireAdmin();
            $title = trim($input['title'] ?? '');
            $slug = trim($input['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

            $stmt = $pdo->prepare("INSERT INTO services (title, slug, short_description, full_description, icon_name, features, technologies, is_active, display_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $title,
                $slug,
                $input['short_description'] ?? '',
                $input['full_description'] ?? '',
                $input['icon_name'] ?? 'Code',
                json_encode($input['features'] ?? []),
                json_encode($input['technologies'] ?? []),
                isset($input['is_active']) ? (int)$input['is_active'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0
            ]);
            jsonSuccess(['id' => $pdo->lastInsertId()], 'Service created successfully.', 201);
        }

        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("UPDATE services SET title = ?, slug = ?, short_description = ?, full_description = ?, icon_name = ?, features = ?, technologies = ?, is_active = ?, display_order = ? WHERE id = ?");
            $stmt->execute([
                $input['title'] ?? '',
                $input['slug'] ?? '',
                $input['short_description'] ?? '',
                $input['full_description'] ?? '',
                $input['icon_name'] ?? 'Code',
                json_encode($input['features'] ?? []),
                json_encode($input['technologies'] ?? []),
                isset($input['is_active']) ? (int)$input['is_active'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0,
                $idOrSub
            ]);
            jsonSuccess(null, 'Service updated successfully.');
        }

        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'Service deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 6. TESTIMONIALS ENDPOINTS (/testimonials)
    if ($resource === 'testimonials') {
        if ($method === 'GET') {
            $all = isset($_GET['all']) && $_GET['all'] === 'true';
            $sql = "SELECT * FROM testimonials" . ($all ? "" : " WHERE is_published = 1") . " ORDER BY display_order ASC, id DESC";
            $stmt = $pdo->query($sql);
            jsonSuccess($stmt->fetchAll());
        }

        if ($method === 'POST') {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("INSERT INTO testimonials (client_name, client_title, company, review, rating, avatar_url, is_published, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['client_name'] ?? '',
                $input['client_title'] ?? '',
                $input['company'] ?? '',
                $input['review'] ?? '',
                isset($input['rating']) ? (int)$input['rating'] : 5,
                $input['avatar_url'] ?? '',
                isset($input['is_published']) ? (int)$input['is_published'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0
            ]);
            jsonSuccess(['id' => $pdo->lastInsertId()], 'Testimonial created successfully.', 201);
        }

        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("UPDATE testimonials SET client_name = ?, client_title = ?, company = ?, review = ?, rating = ?, avatar_url = ?, is_published = ?, display_order = ? WHERE id = ?");
            $stmt->execute([
                $input['client_name'] ?? '',
                $input['client_title'] ?? '',
                $input['company'] ?? '',
                $input['review'] ?? '',
                isset($input['rating']) ? (int)$input['rating'] : 5,
                $input['avatar_url'] ?? '',
                isset($input['is_published']) ? (int)$input['is_published'] : 1,
                isset($input['display_order']) ? (int)$input['display_order'] : 0,
                $idOrSub
            ]);
            jsonSuccess(null, 'Testimonial updated successfully.');
        }

        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'Testimonial deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 7. BLOGS ENDPOINTS (/blogs)
    if ($resource === 'blogs') {
        if ($method === 'GET') {
            if ($idOrSub) {
                $stmt = $pdo->prepare("SELECT * FROM blogs WHERE slug = ? OR id = ? LIMIT 1");
                $stmt->execute([$idOrSub, $idOrSub]);
                $post = $stmt->fetch();
                if (!$post) jsonError('Post not found', 404);
                jsonSuccess($post);
            }

            $all = isset($_GET['all']) && $_GET['all'] === 'true';
            $sql = "SELECT * FROM blogs" . ($all ? "" : " WHERE is_published = 1") . " ORDER BY created_at DESC";
            $stmt = $pdo->query($sql);
            jsonSuccess($stmt->fetchAll());
        }

        if ($method === 'POST') {
            Auth::requireAdmin();
            $title = trim($input['title'] ?? '');
            $slug = trim($input['slug'] ?? '') ?: strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

            $stmt = $pdo->prepare("INSERT INTO blogs (title, slug, excerpt, content, category, author, read_time, cover_image, tags, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $title,
                $slug,
                $input['excerpt'] ?? '',
                $input['content'] ?? '',
                $input['category'] ?? 'Technology',
                $input['author'] ?? 'APPZIO Team',
                $input['read_time'] ?? '5 min read',
                $input['cover_image'] ?? '',
                $input['tags'] ?? '',
                $input['seo_title'] ?? $title,
                $input['seo_description'] ?? $input['excerpt'] ?? '',
                isset($input['is_published']) ? (int)$input['is_published'] : 1
            ]);
            jsonSuccess(['id' => $pdo->lastInsertId(), 'slug' => $slug], 'Blog post created successfully.', 201);
        }

        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, author = ?, read_time = ?, cover_image = ?, tags = ?, seo_title = ?, seo_description = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([
                $input['title'] ?? '',
                $input['slug'] ?? '',
                $input['excerpt'] ?? '',
                $input['content'] ?? '',
                $input['category'] ?? 'Technology',
                $input['author'] ?? 'APPZIO Team',
                $input['read_time'] ?? '5 min read',
                $input['cover_image'] ?? '',
                $input['tags'] ?? '',
                $input['seo_title'] ?? '',
                $input['seo_description'] ?? '',
                isset($input['is_published']) ? (int)$input['is_published'] : 1,
                $idOrSub
            ]);
            jsonSuccess(null, 'Blog post updated successfully.');
        }

        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'Blog post deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 8. FAQS ENDPOINTS (/faqs)
    if ($resource === 'faqs') {
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM faqs WHERE is_active = 1 ORDER BY display_order ASC, id ASC");
            jsonSuccess($stmt->fetchAll());
        }

        if ($method === 'POST') {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['question'] ?? '',
                $input['answer'] ?? '',
                $input['category'] ?? 'General',
                isset($input['display_order']) ? (int)$input['display_order'] : 0,
                isset($input['is_active']) ? (int)$input['is_active'] : 1
            ]);
            jsonSuccess(['id' => $pdo->lastInsertId()], 'FAQ created successfully.', 201);
        }

        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("UPDATE faqs SET question = ?, answer = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?");
            $stmt->execute([
                $input['question'] ?? '',
                $input['answer'] ?? '',
                $input['category'] ?? 'General',
                isset($input['display_order']) ? (int)$input['display_order'] : 0,
                isset($input['is_active']) ? (int)$input['is_active'] : 1,
                $idOrSub
            ]);
            jsonSuccess(null, 'FAQ updated successfully.');
        }

        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM faqs WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'FAQ deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 9. ENQUIRIES ENDPOINTS (/enquiries)
    if ($resource === 'enquiries') {
        // Public Submission (POST /enquiries)
        if ($method === 'POST') {
            $firstName = trim($input['first_name'] ?? '');
            $lastName = trim($input['last_name'] ?? '');
            $fullName = trim($firstName . ' ' . $lastName);
            if (empty($fullName)) {
                $fullName = trim($input['full_name'] ?? '');
            }
            $email = trim($input['email'] ?? '');
            $phone = trim($input['phone'] ?? '');
            $company = trim($input['company_name'] ?? '');
            $service = trim($input['service_required'] ?? '');
            $budget = trim($input['estimated_budget'] ?? '');
            $timeline = trim($input['project_timeline'] ?? '');
            $description = trim($input['project_description'] ?? ($input['additional_information'] ?? ($input['address'] ?? ($input['message'] ?? ''))));
            if (empty($description)) {
                $description = 'Direct inquiry from website contact form.';
            }
            $attachment = trim($input['attachment_url'] ?? '');
            $honeypot = trim($input['website_hp'] ?? ''); // Anti-spam field

            if (!empty($honeypot)) {
                // Silently discard bot submission
                jsonSuccess(null, 'Thank you! Your project enquiry has been submitted.');
            }

            if (!$fullName || !$email || !$description) {
                jsonError('Please complete all required fields (Name, Email, and Project Description).');
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                jsonError('Please enter a valid business email address.');
            }

            $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

            // Rate limit check: max 5 submissions per hour per IP
            $checkStmt = $pdo->prepare("SELECT COUNT(*) as count FROM enquiries WHERE ip_address = ? AND created_at > datetime('now', '-1 hour')");
            // If mysql:
            if ($pdo->getAttribute(PDO::ATTR_DRIVER_NAME) === 'mysql') {
                $checkStmt = $pdo->prepare("SELECT COUNT(*) as count FROM enquiries WHERE ip_address = ? AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
            }
            $checkStmt->execute([$ip]);
            $recentCount = (int)($checkStmt->fetch()['count'] ?? 0);

            if ($recentCount > 5) {
                jsonError('You have submitted multiple enquiries recently. Please contact us directly via WhatsApp or email.', 429);
            }

            $stmt = $pdo->prepare("INSERT INTO enquiries (
                full_name, email, phone, company_name, service_required,
                estimated_budget, project_timeline, project_description, attachment_url, status, ip_address
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', ?)");

            $stmt->execute([
                $fullName, $email, $phone, $company, $service,
                $budget, $timeline, $description, $attachment, $ip
            ]);

            $enquiryId = $pdo->lastInsertId();

            // Attempt notification email if configured
            if (ini_get('sendmail_path') || ini_get('SMTP')) {
                @mail(
                    'contact@appzio.com',
                    "New Project Enquiry from {$fullName} - APPZIO",
                    "New enquiry details:\n\nName: {$fullName}\nEmail: {$email}\nPhone: {$phone}\nCompany: {$company}\nService: {$service}\nBudget: {$budget}\nTimeline: {$timeline}\n\nDescription:\n{$description}\n",
                    "From: notifications@appzio.com\r\nReply-To: {$email}\r\n"
                );
            }

            jsonSuccess(['id' => $enquiryId], 'Thank you! Your enquiry has been received. Our team will review your project and get back to you within 24 hours.', 201);
        }

        // Admin: Export CSV (/enquiries/export)
        if ($method === 'GET' && $idOrSub === 'export') {
            Auth::requireAdmin();
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="appzio_enquiries_' . date('Y-m-d') . '.csv"');
            
            $output = fopen('php://output', 'w');
            fputcsv($output, ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Description', 'Notes']);

            $stmt = $pdo->query("SELECT * FROM enquiries ORDER BY created_at DESC");
            while ($row = $stmt->fetch()) {
                fputcsv($output, [
                    $row['id'],
                    $row['created_at'],
                    $row['full_name'],
                    $row['email'],
                    $row['phone'],
                    $row['company_name'],
                    $row['service_required'],
                    $row['estimated_budget'],
                    $row['project_timeline'],
                    $row['status'],
                    $row['project_description'],
                    $row['internal_notes']
                ]);
            }
            fclose($output);
            exit;
        }

        // Admin: List enquiries (/enquiries)
        if ($method === 'GET') {
            Auth::requireAdmin();
            $status = $_GET['status'] ?? null;
            $search = $_GET['search'] ?? null;

            $sql = "SELECT * FROM enquiries WHERE 1=1";
            $params = [];

            if ($status && $status !== 'All') {
                $sql .= " AND status = ?";
                $params[] = $status;
            }
            if ($search) {
                $sql .= " AND (full_name LIKE ? OR email LIKE ? OR company_name LIKE ? OR project_description LIKE ?)";
                $wildcard = "%{$search}%";
                $params = array_merge($params, [$wildcard, $wildcard, $wildcard, $wildcard]);
            }

            $sql .= " ORDER BY created_at DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            jsonSuccess($stmt->fetchAll());
        }

        // Admin: Update Status / Notes (/enquiries/{id})
        if ($method === 'PUT' && $idOrSub) {
            Auth::requireAdmin();
            $status = $input['status'] ?? 'New';
            $notes = $input['internal_notes'] ?? '';

            $stmt = $pdo->prepare("UPDATE enquiries SET status = ?, internal_notes = ? WHERE id = ?");
            $stmt->execute([$status, $notes, $idOrSub]);
            jsonSuccess(null, 'Enquiry updated successfully.');
        }

        // Admin: Delete Enquiry (/enquiries/{id})
        if ($method === 'DELETE' && $idOrSub) {
            Auth::requireAdmin();
            $stmt = $pdo->prepare("DELETE FROM enquiries WHERE id = ?");
            $stmt->execute([$idOrSub]);
            jsonSuccess(null, 'Enquiry deleted successfully.');
        }

        jsonError('Method not allowed', 405);
    }

    // 10. ADMIN DASHBOARD STATS (/dashboard/stats)
    if ($resource === 'dashboard' && $idOrSub === 'stats') {
        Auth::requireAdmin();

        $stats = [];
        $stats['total_projects'] = (int)($pdo->query("SELECT COUNT(*) as c FROM projects")->fetch()['c'] ?? 0);
        $stats['published_projects'] = (int)($pdo->query("SELECT COUNT(*) as c FROM projects WHERE is_published = 1")->fetch()['c'] ?? 0);
        $stats['total_services'] = (int)($pdo->query("SELECT COUNT(*) as c FROM services WHERE is_active = 1")->fetch()['c'] ?? 0);
        $stats['total_enquiries'] = (int)($pdo->query("SELECT COUNT(*) as c FROM enquiries")->fetch()['c'] ?? 0);
        $stats['new_enquiries'] = (int)($pdo->query("SELECT COUNT(*) as c FROM enquiries WHERE status = 'New'")->fetch()['c'] ?? 0);
        $stats['published_blogs'] = (int)($pdo->query("SELECT COUNT(*) as c FROM blogs WHERE is_published = 1")->fetch()['c'] ?? 0);
        $stats['total_testimonials'] = (int)($pdo->query("SELECT COUNT(*) as c FROM testimonials WHERE is_published = 1")->fetch()['c'] ?? 0);

        // Recent 5 enquiries
        $stmt = $pdo->query("SELECT id, full_name, email, service_required, estimated_budget, status, created_at FROM enquiries ORDER BY created_at DESC LIMIT 5");
        $stats['recent_enquiries'] = $stmt->fetchAll();

        jsonSuccess($stats);
    }

    // 11. FILE UPLOAD ENDPOINT (/upload)
    if ($resource === 'upload' && $method === 'POST') {
        Auth::requireAdmin();

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            jsonError('No valid file uploaded.');
        }

        $file = $_FILES['file'];
        $maxSize = 10 * 1024 * 1024; // 10MB
        if ($file['size'] > $maxSize) {
            jsonError('File size exceeds the 10MB limit.');
        }

        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'application/pdf'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mime, $allowedTypes)) {
            jsonError('Unsupported file type. Allowed: JPG, PNG, WEBP, SVG, GIF, PDF.');
        }

        $uploadDir = __DIR__ . '/uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = 'appzio_' . uniqid() . '.' . strtolower($ext);
        $destination = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            jsonError('Failed to save uploaded file.');
        }

        $fileUrl = '/api/uploads/' . $filename;
        jsonSuccess(['url' => $fileUrl, 'filename' => $filename], 'File uploaded successfully.');
    }

    // 12. STATIC FILE SERVING FOR UPLOADS (/uploads/...)
    if ($resource === 'uploads' && $idOrSub) {
        $safeFile = basename($idOrSub);
        $filePath = __DIR__ . '/uploads/' . $safeFile;
        if (file_exists($filePath)) {
            $mime = mime_content_type($filePath);
            header('Content-Type: ' . $mime);
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit;
        }
        jsonError('File not found', 404);
    }

    jsonError("Endpoint not found: /api/{$path}", 404);

} catch (Exception $e) {
    jsonError('Server Error: ' . $e->getMessage(), 500);
}
