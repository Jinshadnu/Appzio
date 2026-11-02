<?php
/**
 * APPZIO Database Connection
 * Supports MySQL (Default for Hostinger) with automatic SQLite fallback for local development.
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance !== null) {
            return self::$instance;
        }

        // Hostinger / Environment Config
        $dbHost = getenv('DB_HOST') ?: '127.0.0.1';
        $dbName = getenv('DB_NAME') ?: 'appzio_db';
        $dbUser = getenv('DB_USER') ?: 'root';
        $dbPass = getenv('DB_PASS') ?: '';
        $dbPort = getenv('DB_PORT') ?: '3306';
        $forceSqlite = getenv('USE_SQLITE') === 'true';

        if (!$forceSqlite) {
            try {
                $dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4";
                $pdo = @new PDO($dsn, $dbUser, $dbPass, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
                self::$instance = $pdo;
                self::ensureSchema($pdo, 'mysql');
                return self::$instance;
            } catch (Throwable $e) {
                // If MySQL fails (e.g. local environment without running MySQL daemon), fall back to SQLite
            }
        }

        // Fallback to SQLite (creates api/database.sqlite automatically)
        $sqlitePath = dirname(__DIR__) . '/database.sqlite';
        try {
            $pdo = new PDO("sqlite:" . $sqlitePath, null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
            self::$instance = $pdo;
            self::ensureSchema($pdo, 'sqlite');
            return self::$instance;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection failed: ' . $e->getMessage()
            ]);
            exit;
        }
    }

    private static function ensureSchema(PDO $pdo, string $driver): void {
        // Create tables if not exist
        $idType = ($driver === 'sqlite') ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
        $textType = 'TEXT';
        $timeType = ($driver === 'sqlite') ? 'DATETIME DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP';

        // 1. Users table (Admin)
        $pdo->exec("CREATE TABLE IF NOT EXISTS users (
            id {$idType},
            name VARCHAR(150) NOT NULL,
            email VARCHAR(191) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'admin',
            created_at {$timeType},
            updated_at {$timeType}
        )");

        // 2. Settings table
        $pdo->exec("CREATE TABLE IF NOT EXISTS settings (
            setting_key VARCHAR(100) PRIMARY KEY,
            setting_value {$textType},
            updated_at {$timeType}
        )");

        // 3. Projects table
        $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
            id {$idType},
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            category VARCHAR(100) NOT NULL,
            client VARCHAR(150),
            tagline VARCHAR(255),
            short_description {$textType},
            overview {$textType},
            objectives {$textType},
            challenges {$textType},
            solutions {$textType},
            key_features {$textType},
            technologies {$textType},
            thumbnail VARCHAR(255),
            cover_image VARCHAR(255),
            gallery_images {$textType},
            live_url VARCHAR(255),
            play_store_url VARCHAR(255),
            app_store_url VARCHAR(255),
            is_featured BOOLEAN DEFAULT 0,
            is_published BOOLEAN DEFAULT 1,
            display_order INT DEFAULT 0,
            created_at {$timeType},
            updated_at {$timeType}
        )");

        // 4. Services table
        $pdo->exec("CREATE TABLE IF NOT EXISTS services (
            id {$idType},
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            short_description {$textType},
            full_description {$textType},
            icon_name VARCHAR(100) DEFAULT 'Code',
            features {$textType},
            technologies {$textType},
            is_active BOOLEAN DEFAULT 1,
            display_order INT DEFAULT 0,
            created_at {$timeType}
        )");

        // 5. Testimonials table
        $pdo->exec("CREATE TABLE IF NOT EXISTS testimonials (
            id {$idType},
            client_name VARCHAR(150) NOT NULL,
            client_title VARCHAR(150),
            company VARCHAR(150),
            review {$textType} NOT NULL,
            rating INT DEFAULT 5,
            avatar_url VARCHAR(255),
            is_published BOOLEAN DEFAULT 1,
            display_order INT DEFAULT 0,
            created_at {$timeType}
        )");

        // 6. Blog posts table
        $pdo->exec("CREATE TABLE IF NOT EXISTS blogs (
            id {$idType},
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            excerpt {$textType},
            content {$textType} NOT NULL,
            category VARCHAR(100) DEFAULT 'Technology',
            author VARCHAR(100) DEFAULT 'APPZIO Team',
            read_time VARCHAR(50) DEFAULT '5 min read',
            cover_image VARCHAR(255),
            tags VARCHAR(255),
            seo_title VARCHAR(255),
            seo_description {$textType},
            is_published BOOLEAN DEFAULT 1,
            created_at {$timeType},
            updated_at {$timeType}
        )");

        // 7. Enquiries table
        $pdo->exec("CREATE TABLE IF NOT EXISTS enquiries (
            id {$idType},
            full_name VARCHAR(150) NOT NULL,
            email VARCHAR(191) NOT NULL,
            phone VARCHAR(50),
            company_name VARCHAR(150),
            service_required VARCHAR(100),
            estimated_budget VARCHAR(100),
            project_timeline VARCHAR(100),
            project_description {$textType} NOT NULL,
            attachment_url VARCHAR(255),
            status VARCHAR(50) DEFAULT 'New',
            internal_notes {$textType},
            ip_address VARCHAR(50),
            created_at {$timeType}
        )");

        // 8. FAQs table
        $pdo->exec("CREATE TABLE IF NOT EXISTS faqs (
            id {$idType},
            question VARCHAR(255) NOT NULL,
            answer {$textType} NOT NULL,
            category VARCHAR(100) DEFAULT 'General',
            display_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT 1
        )");

        // Check if admin user exists, if not seed initial admin and data
        self::seedDefaultData($pdo);
    }

    private static function seedDefaultData(PDO $pdo): void {
        // Admin user seed
        $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM users WHERE email = ?");
        $stmt->execute(['admin@appzio.com']);
        $userCount = (int)($stmt->fetch()['count'] ?? 0);

        if ($userCount === 0) {
            $hashedPassword = password_hash('Appzio@2026!', PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
            $stmt->execute(['APPZIO Administrator', 'admin@appzio.com', $hashedPassword, 'admin']);
        }

        // Settings seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM settings");
        $settingsCount = (int)($stmt->fetch()['count'] ?? 0);

        if ($settingsCount === 0) {
            $defaultSettings = [
                'company_name' => 'APPZIO',
                'tagline' => 'Transforming Ideas Into Digital Experiences.',
                'tagline_alt' => 'Building Powerful Digital Experiences.',
                'meta_description' => 'APPZIO is a premium digital agency & software development company building websites, mobile applications, and custom digital software for global clients.',
                'contact_email' => 'appzio@gmail.com',
                'contact_phone' => '+91 9526026636',
                'contact_whatsapp' => '+91 9526026636',
                'address' => 'Kerala, India',
                'social_linkedin' => 'https://linkedin.com/company/appzio',
                'social_github' => 'https://github.com/appzio',
                'social_instagram' => 'https://instagram.com/appziodigital',
                'copyright_text' => '© ' . date('Y') . ' APPZIO. All Rights Reserved. Crafted for digital excellence.',
                'hero_label' => 'DIGITAL SOLUTIONS • CREATIVE DEVELOPMENT • TECHNOLOGY',
                'hero_heading' => 'Building Digital Experiences That Move Businesses Forward.',
                'hero_subheading' => 'We design and develop powerful websites, mobile applications, and desktop software that help businesses transform ideas into impactful digital products.',
                'about_heading' => 'Technology Meets Creativity.',
                'about_description' => 'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.',
                'cta_heading' => 'Have an Idea? Let’s Build Something Great.',
                'cta_description' => 'Whether you need a website, mobile application, or custom software, let’s turn your vision into a powerful digital solution.'
            ];

            $insertStmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)");
            foreach ($defaultSettings as $key => $val) {
                $insertStmt->execute([$key, $val]);
            }
        }

        // Services seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM services");
        if ((int)($stmt->fetch()['count'] ?? 0) === 0) {
            $services = [
                [
                    'title' => 'Website Development',
                    'slug' => 'website-development',
                    'short_description' => 'Modern, responsive, SEO-friendly websites tailored to your business goals and built with cutting-edge web technologies.',
                    'full_description' => 'We create high-converting, lightning-fast digital storefronts, corporate portals, and SaaS web applications designed with modern architecture and seamless UX.',
                    'icon_name' => 'Globe',
                    'features' => json_encode(['Custom Next.js & React Architectures', 'Ultra-fast Core Web Vitals Optimization', 'Enterprise Headless CMS Integration', 'Full Mobile & Tablet Responsiveness']),
                    'technologies' => json_encode(['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'Node.js', 'Next.js']),
                    'display_order' => 1
                ],
                [
                    'title' => 'Mobile Application Development',
                    'slug' => 'mobile-application-development',
                    'short_description' => 'Powerful native and cross-platform Android and iOS applications built with Flutter and Kotlin for maximum engagement.',
                    'full_description' => 'From initial concept and user journey mapping to App Store and Google Play publishing, we build resilient mobile apps with butter-smooth animations and offline capabilities.',
                    'icon_name' => 'Smartphone',
                    'features' => json_encode(['Cross-Platform Flutter & Native Kotlin', 'Secure Authentication & Biometrics', 'Real-time WebSocket & Push Notifications', 'Offline-First Local Storage']),
                    'technologies' => json_encode(['Flutter', 'Dart', 'Kotlin', 'Java', 'Firebase', 'REST APIs']),
                    'display_order' => 2
                ],
                [
                    'title' => 'Desktop Application Development',
                    'slug' => 'desktop-application-development',
                    'short_description' => 'Reliable cross-platform desktop software and business management applications tailored for heavy workflows.',
                    'full_description' => 'Engineered for high performance, hardware connectivity, and robust offline stability across macOS, Windows, and Linux environments.',
                    'icon_name' => 'Monitor',
                    'features' => json_encode(['Cross-platform macOS, Windows & Linux', 'Local hardware & peripheral integration', 'High-throughput data processing', 'Automated background updater']),
                    'technologies' => json_encode(['Flutter Desktop', 'Electron', 'Node.js', 'SQLite', 'C++']),
                    'display_order' => 3
                ],
                [
                    'title' => 'Custom Software Development',
                    'slug' => 'custom-software-development',
                    'short_description' => 'Tailored digital solutions, enterprise dashboards, CRM systems, and automated workflows designed around your business.',
                    'full_description' => 'We solve bespoke operational bottlenecks by engineering tailored digital products with modular architecture, strict data security, and scalable infrastructure.',
                    'icon_name' => 'Cpu',
                    'features' => json_encode(['Scalable Microservices Architecture', 'Custom ERP & CRM Portals', 'Automated Business Workflows', 'Role-based Access Control (RBAC)']),
                    'technologies' => json_encode(['PHP', 'Node.js', 'MySQL', 'PostgreSQL', 'Docker', 'Redis']),
                    'display_order' => 4
                ],
                [
                    'title' => 'UI/UX Design',
                    'slug' => 'ui-ux-design',
                    'short_description' => 'Beautiful, intuitive, user-focused digital experiences that captivate users and elevate brand perception.',
                    'full_description' => 'We craft high-fidelity Figma prototypes, interactive design systems, and user-centric wireframes that balance aesthetics with frictionless usability.',
                    'icon_name' => 'Layout',
                    'features' => json_encode(['Comprehensive Figma Design Systems', 'Interactive Prototypes & Wireframing', 'User Journey & Empathy Mapping', 'Design-to-Code Precision Handoff']),
                    'technologies' => json_encode(['Figma', 'Adobe XD', 'Protopie', 'Design Systems']),
                    'display_order' => 5
                ],
                [
                    'title' => 'Maintenance & Support',
                    'slug' => 'maintenance-and-support',
                    'short_description' => 'Continuous improvements, performance optimization, security auditing, bug fixing, and SLA-backed technical support.',
                    'full_description' => 'Ensure your digital platforms operate with 99.9% uptime, zero security vulnerabilities, and uninterrupted performance with our dedicated engineering care.',
                    'icon_name' => 'ShieldCheck',
                    'features' => json_encode(['24/7 Server & API Health Monitoring', 'Security Patches & Vulnerability Audits', 'Database Optimization & Backups', 'Version Upgrades & Speed Enhancements']),
                    'technologies' => json_encode(['CI/CD', 'Git', 'Linux Server', 'Monitoring Tools']),
                    'display_order' => 6
                ]
            ];

            $insertStmt = $pdo->prepare("INSERT INTO services (title, slug, short_description, full_description, icon_name, features, technologies, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($services as $srv) {
                $insertStmt->execute([
                    $srv['title'], $srv['slug'], $srv['short_description'], $srv['full_description'],
                    $srv['icon_name'], $srv['features'], $srv['technologies'], $srv['display_order']
                ]);
            }
        }

        // Projects seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM projects");
        if ((int)($stmt->fetch()['count'] ?? 0) === 0) {
            $projects = [
                [
                    'title' => 'AetherPay — Next-Gen Fintech Mobile & Web Platform',
                    'slug' => 'aetherpay-fintech-platform',
                    'category' => 'Mobile Applications',
                    'client' => 'Aether Financial Technologies (UAE & UK)',
                    'tagline' => 'Multi-currency digital wallet & instant borderless transfer solution',
                    'short_description' => 'A high-security, multi-currency mobile fintech application supporting cross-border remittances, biometric payments, and real-time expense tracking across GCC and Europe.',
                    'overview' => 'Aether Financial sought to build a compliant, lightning-fast digital wallet catering to expatriates and international enterprises across the UAE and UK. APPZIO designed and engineered the entire mobile application ecosystem using Flutter alongside a fortified PHP REST backend.',
                    'objectives' => '• Deliver sub-second cross-currency transfers with dynamic FX rates.\n• Achieve bank-grade end-to-end encryption and biometrics.\n• Maintain 60fps micro-animations on both low-end and flagship smartphones.',
                    'challenges' => 'Integrating multiple banking payment gateways with stringent PCI-DSS compliance while guaranteeing offline transaction queueing and synchronization.',
                    'solutions' => 'Architected a reactive Flutter frontend with state-driven local caching, backed by asynchronous webhook workers and biometric encryption vaults.',
                    'key_features' => json_encode([
                        'Instant Multi-Currency Wallet (USD, AED, EUR, GBP, INR)',
                        'Biometric Touch ID & Face ID Quick Sign-in',
                        'Real-time FX Rate Live Stream & Conversion Calculator',
                        'Dynamic QR Code Point-of-Sale Checkout',
                        'Automated PDF Statement Generation & Tax Exports'
                    ]),
                    'technologies' => json_encode(['Flutter', 'Dart', 'PHP', 'MySQL', 'Firebase', 'REST APIs', 'Node.js']),
                    'thumbnail' => '/assets/projects/aetherpay-thumb.png',
                    'cover_image' => '/assets/projects/aetherpay-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/aetherpay-thumb.png',
                        '/assets/projects/aetherpay-cover.png'
                    ]),
                    'live_url' => 'https://aetherpay.example.com',
                    'play_store_url' => 'https://play.google.com/store/apps/details?id=com.aetherpay.app',
                    'app_store_url' => 'https://apps.apple.com/app/aetherpay/id123456789',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 1
                ],
                [
                    'title' => 'Novus Omnichannel Logistics ERP',
                    'slug' => 'novus-logistics-erp',
                    'category' => 'Custom Software',
                    'client' => 'Novus Global Freight Lines (Saudi Arabia & Qatar)',
                    'tagline' => 'Enterprise freight forwarding & fleet dispatch tracking system',
                    'short_description' => 'An enterprise freight automation dashboard and dispatcher system handling container tracking, automated customs documentation, and predictive fleet route optimization.',
                    'overview' => 'Novus Freight manages over 1,200 active road transports and sea containers daily across the Gulf region. They required an all-in-one software ecosystem to replace fragmented legacy spreadsheets with a cohesive, real-time command portal.',
                    'objectives' => '• Consolidate container tracking into a single unified dashboard.\n• Automate customs clearance documentation workflows.\n• Provide real-time GPS telemetry to clients.',
                    'challenges' => 'Processing high-frequency telematics data streams from cross-border fleets while providing snappy search across millions of historical cargo records.',
                    'solutions' => 'Engineered a React + TypeScript single page portal paired with a high-throughput PHP/MySQL data engine with indexed spatial geometry.',
                    'key_features' => json_encode([
                        'Live Interactive Map Fleet Telemetry & Geofence Alerts',
                        'Automated Customs Waybill Generation with QR Verification',
                        'Multi-warehouse Inventory Ingestion & Stock Valuation',
                        'Driver Dispatch Mobile Companion Portal',
                        'Customer Self-service Tracking Widget'
                    ]),
                    'technologies' => json_encode(['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'MySQL', 'REST APIs']),
                    'thumbnail' => '/assets/projects/novus-thumb.png',
                    'cover_image' => '/assets/projects/novus-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/novus-thumb.png',
                        '/assets/projects/novus-cover.png'
                    ]),
                    'live_url' => 'https://novuslogistics.example.com',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 2
                ],
                [
                    'title' => 'Lumina Dental & Medical Clinic Management Suite',
                    'slug' => 'lumina-medical-suite',
                    'category' => 'Desktop Applications',
                    'client' => 'Lumina Health Group (Europe & UAE)',
                    'tagline' => 'High-performance desktop clinical management & imaging station',
                    'short_description' => 'A dedicated desktop application for healthcare practitioners featuring local DICOM imaging rendering, appointment scheduling, and automated prescription management.',
                    'overview' => 'Healthcare clinics demand zero-downtime desktop reliability. APPZIO developed a cross-platform desktop suite allowing doctors to view patient records, review high-res medical X-rays locally, and coordinate appointments even during internet interruptions.',
                    'objectives' => '• Local offline-first medical record repository.\n• High-fidelity DICOM radiographic viewer integration.\n• Seamless hardware synchronization with barcode scanners and thermal printers.',
                    'challenges' => 'Ensuring strict compliance with GDPR medical privacy protocols while enabling rapid local caching and silent cloud background sync.',
                    'solutions' => 'Constructed a robust desktop software utilizing Flutter Desktop and local SQLite encrypted databases with dual-sync background bridges.',
                    'key_features' => json_encode([
                        'Offline-First Patient History & Treatment Planning',
                        'Integrated Digital Radiography & High-Res Image Annotator',
                        'Thermal Prescription & Receipt Printing',
                        'EHR/EMR Cloud Synchronization with AES-256 Vaulting'
                    ]),
                    'technologies' => json_encode(['Flutter Desktop', 'Dart', 'SQLite', 'REST APIs', 'Node.js']),
                    'thumbnail' => '/assets/projects/lumina-thumb.png',
                    'cover_image' => '/assets/projects/lumina-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/lumina-thumb.png',
                        '/assets/projects/lumina-cover.png'
                    ]),
                    'live_url' => 'https://luminaclinic.example.com',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 3
                ],
                [
                    'title' => 'Krona Luxury Architectural Studio Web Experience',
                    'slug' => 'krona-architectural-web',
                    'category' => 'Websites',
                    'client' => 'Krona Architects (Milan & London)',
                    'tagline' => 'Award-winning digital portfolio showcasing premium architecture',
                    'short_description' => 'An editorial, high-aesthetic web experience built with smooth page transitions, interactive 3D spatial renders, and responsive typography that elevated client inquiries by 240%.',
                    'overview' => 'Krona Architects needed a web presence reflecting their minimalist, sculptural design ethos. APPZIO crafted a bespoke website combining clean editorial layout with subtle WebGL shaders and effortless portfolio filtering.',
                    'objectives' => '• Editorial typography inspired by international architectural publications.\n• Fluid navigation and instant image loading.\n• Direct integration with architectural project enquiry workflows.',
                    'challenges' => 'Delivering rich full-bleed 4K architectural photography without compromising on 95+ Core Web Vitals performance scores.',
                    'solutions' => 'Implemented modern responsive WebP image pipelines, intersection-observer lazy-loading, and Framer Motion micro-interactions.',
                    'key_features' => json_encode([
                        'Full-bleed Interactive Portfolio Gallery with Smooth Zoom',
                        'Interactive Project Blueprint & Material Inspector',
                        'Dark / Light Architectural Theme Switcher',
                        'Client Consultation Booking System with Calendar Sync'
                    ]),
                    'technologies' => json_encode(['React', 'TypeScript', 'Tailwind CSS', 'PHP', 'Framer Motion']),
                    'thumbnail' => '/assets/projects/krona-thumb.png',
                    'cover_image' => '/assets/projects/krona-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/krona-thumb.png',
                        '/assets/projects/krona-cover.png'
                    ]),
                    'live_url' => 'https://krona-studio.example.com',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 4
                ],
                [
                    'title' => 'PulseFit Mobile Workout Companion & AI Coach',
                    'slug' => 'pulsefit-ai-workout-app',
                    'category' => 'Mobile Applications',
                    'client' => 'PulseFit Inc. (India & USA)',
                    'tagline' => 'Interactive workout tracker & AI personal fitness guidance',
                    'short_description' => 'A modern mobile application featuring personalized workout plans, Bluetooth wearable heart-rate telemetry, video coaching, and community challenge boards.',
                    'overview' => 'PulseFit empowers fitness enthusiasts to track sets, monitor heart-rate zones in real-time, and follow adaptive workout regimens generated by fitness trainers.',
                    'objectives' => '• Real-time Bluetooth BLE sync with smart bands.\n• Smooth 60fps workout timer and interval animations.\n• Social leaderboards and challenge milestones.',
                    'challenges' => 'Accurate background timer execution without OS battery-saver termination on Android and iOS.',
                    'solutions' => 'Developed custom native background services in Kotlin and Swift with Flutter UI presentation layers.',
                    'key_features' => json_encode([
                        'Real-time Bluetooth BLE Smartwatch & Heart Rate Sync',
                        'Offline Exercise Database with HD Exercise Demonstrations',
                        'Dynamic Calorie & Macro Target Calculations',
                        'Community Leaderboard & Streak Gamification'
                    ]),
                    'technologies' => json_encode(['Flutter', 'Dart', 'Kotlin', 'Firebase', 'REST APIs']),
                    'thumbnail' => '/assets/projects/pulsefit-thumb.png',
                    'cover_image' => '/assets/projects/pulsefit-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/pulsefit-thumb.png',
                        '/assets/projects/pulsefit-cover.png'
                    ]),
                    'live_url' => 'https://pulsefitapp.example.com',
                    'play_store_url' => 'https://play.google.com/store/apps/details?id=com.pulsefit.app',
                    'app_store_url' => 'https://apps.apple.com/app/pulsefit/id987654321',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 5
                ],
                [
                    'title' => 'Apex SaaS Analytics & Infrastructure Monitoring',
                    'slug' => 'apex-saas-analytics-suite',
                    'category' => 'UI/UX Design',
                    'client' => 'Apex Cloud Systems (Singapore & Germany)',
                    'tagline' => 'Comprehensive enterprise design system & UI/UX architecture',
                    'short_description' => 'End-to-end UX research, wireframing, high-fidelity UI design, and complete component design library for a multi-tenant cloud monitoring dashboard.',
                    'overview' => 'Apex Cloud Systems needed to overhaul their legacy server monitoring platform into a sleek, dark-themed SaaS experience that reduces cognitive overload for DevOps engineers.',
                    'objectives' => '• Design over 80+ unique responsive dashboard screens.\n• Create a scalable tokenized Figma design system.\n• Facilitate seamless developer implementation.',
                    'challenges' => 'Organizing high-density metrics, logs, and server graphs into an intuitive visual hierarchy with high contrast and zero visual fatigue.',
                    'solutions' => 'Established a scientific dark-mode color palette, custom data-visualization components, and micro-interactions tested with DevOps professionals.',
                    'key_features' => json_encode([
                        'Comprehensive 120+ Component Figma Design System',
                        'Custom Color-blind Friendly Data Visualization Palettes',
                        'Interactive Micro-prototypes with Realistic Hover States',
                        'Complete Tailwind CSS Design Tokens Specification'
                    ]),
                    'technologies' => json_encode(['Figma', 'UI/UX Design', 'Tailwind CSS', 'React']),
                    'thumbnail' => '/assets/projects/apex-thumb.png',
                    'cover_image' => '/assets/projects/apex-cover.png',
                    'gallery_images' => json_encode([
                        '/assets/projects/apex-thumb.png',
                        '/assets/projects/apex-cover.png'
                    ]),
                    'live_url' => 'https://apexcloud.example.com',
                    'is_featured' => 1,
                    'is_published' => 1,
                    'display_order' => 6
                ]
            ];

            $insertStmt = $pdo->prepare("INSERT INTO projects (title, slug, category, client, tagline, short_description, overview, objectives, challenges, solutions, key_features, technologies, thumbnail, cover_image, gallery_images, live_url, play_store_url, app_store_url, is_featured, is_published, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($projects as $p) {
                $insertStmt->execute([
                    $p['title'], $p['slug'], $p['category'], $p['client'], $p['tagline'],
                    $p['short_description'], $p['overview'], $p['objectives'], $p['challenges'],
                    $p['solutions'], $p['key_features'], $p['technologies'], $p['thumbnail'],
                    $p['cover_image'], $p['gallery_images'], $p['live_url'], $p['play_store_url'] ?? null,
                    $p['app_store_url'] ?? null, $p['is_featured'], $p['is_published'], $p['display_order']
                ]);
            }
        }

        // Testimonials seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM testimonials");
        if ((int)($stmt->fetch()['count'] ?? 0) === 0) {
            $testimonials = [
                [
                    'client_name' => 'Alexander Wright',
                    'client_title' => 'Chief Technology Officer',
                    'company' => 'Aether Financial Technologies (London, UK)',
                    'review' => 'Working with APPZIO was a game-changer for our fintech product launch. Their technical mastery of Flutter and backend architecture ensured our app delivered bank-grade reliability with an exceptionally refined, modern interface. They hit every milestone ahead of schedule.',
                    'rating' => 5,
                    'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
                    'display_order' => 1
                ],
                [
                    'client_name' => 'Rashid Al-Maktoum',
                    'client_title' => 'Managing Director',
                    'company' => 'Novus Freight Logistics (Dubai, UAE)',
                    'review' => 'APPZIO engineered our regional logistics portal from the ground up. Their team has rare dual-competence: deep architectural knowledge coupled with an intuitive eye for premium UX. Our dispatch times plummeted by 40% in the first quarter of deployment.',
                    'rating' => 5,
                    'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
                    'display_order' => 2
                ],
                [
                    'client_name' => 'Elena Rossi',
                    'client_title' => 'Principal Architect & Partner',
                    'company' => 'Krona Architectural Studio (Milan, Italy)',
                    'review' => 'We approached APPZIO with an uncompromising aesthetic vision for our architectural portfolio. They translated our concepts into a silky-smooth, responsive digital reality. Our international client inquiries surged immediately.',
                    'rating' => 5,
                    'avatar_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
                    'display_order' => 3
                ],
                [
                    'client_name' => 'Dr. Julian Weber',
                    'client_title' => 'Head of Medical Operations',
                    'company' => 'Lumina Health Group (Munich, Germany)',
                    'review' => 'Building desktop software for healthcare requires absolute precision and zero margin for error. APPZIO delivered an offline-first desktop suite that our clinical staff enjoys using every single day. Their ongoing support is unmatched.',
                    'rating' => 5,
                    'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
                    'display_order' => 4
                ]
            ];

            $insertStmt = $pdo->prepare("INSERT INTO testimonials (client_name, client_title, company, review, rating, avatar_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($testimonials as $t) {
                $insertStmt->execute([
                    $t['client_name'], $t['client_title'], $t['company'], $t['review'], $t['rating'], $t['avatar_url'], $t['display_order']
                ]);
            }
        }

        // FAQs seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM faqs");
        if ((int)($stmt->fetch()['count'] ?? 0) === 0) {
            $faqs = [
                [
                    'question' => 'What services does APPZIO provide?',
                    'answer' => 'APPZIO specializes in full-lifecycle digital product development: high-performance Websites, cross-platform Mobile Applications (Android & iOS with Flutter/Kotlin), Desktop Software (macOS, Windows, Linux), Custom Enterprise Software, UI/UX Design Systems, API Development, and 24/7 SLA Maintenance & Optimization.',
                    'display_order' => 1
                ],
                [
                    'question' => 'Can you develop both websites and mobile applications?',
                    'answer' => 'Yes, absolutely. We frequently engineer end-to-end product ecosystems where web apps, customer mobile apps, and administrative backend portals share a centralized, unified API and design system for seamless business continuity.',
                    'display_order' => 2
                ],
                [
                    'question' => 'Do you develop custom desktop applications?',
                    'answer' => 'Yes. We specialize in cross-platform desktop applications (built with Flutter Desktop, Electron, and C++ runtimes) engineered for heavy data workflows, local hardware interfacing (scanners, printers, medical devices), and robust offline performance.',
                    'display_order' => 3
                ],
                [
                    'question' => 'Can you work with international clients?',
                    'answer' => 'Yes. We proudly collaborate with startups, SMEs, and international companies across India, UAE, Saudi Arabia, Qatar, Europe, the UK, and North America. We accommodate global time zones, provide bilingual project management, and execute contracts with complete NDA confidentiality.',
                    'display_order' => 4
                ],
                [
                    'question' => 'How does your development process work?',
                    'answer' => 'Our 6-step engineering methodology comprises: 1. Discovery (goals and architecture mapping), 2. Planning (user stories and roadmap), 3. Design (Figma UI/UX & interactive prototypes), 4. Development (clean, modular code), 5. Quality Assurance (performance & vulnerability testing), and 6. Launch & Ongoing SLA Support.',
                    'display_order' => 5
                ],
                [
                    'question' => 'Do you provide maintenance and support after launch?',
                    'answer' => 'Yes. Every project includes complimentary post-launch support. Additionally, we provide monthly maintenance packages encompassing server monitoring, security patching, OS version compatibility updates, and continuous feature expansion.',
                    'display_order' => 6
                ],
                [
                    'question' => 'How can I get a project quotation?',
                    'answer' => 'You can submit our Project Enquiry form or reach out directly via WhatsApp or email (contact@appzio.com). We will analyze your specifications and provide a detailed scope breakdown, timeline estimate, and milestone quotation within 24 to 48 hours.',
                    'display_order' => 7
                ]
            ];

            $insertStmt = $pdo->prepare("INSERT INTO faqs (question, answer, display_order) VALUES (?, ?, ?)");
            foreach ($faqs as $f) {
                $insertStmt->execute([$f['question'], $f['answer'], $f['display_order']]);
            }
        }

        // Blog seed
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM blogs");
        if ((int)($stmt->fetch()['count'] ?? 0) === 0) {
            $blogs = [
                [
                    'title' => 'Why Cross-Platform Flutter is Dominating Enterprise Mobile Development in 2026',
                    'slug' => 'why-flutter-dominates-enterprise-mobile-2026',
                    'excerpt' => 'An in-depth analysis of Flutter’s architectural maturity, rendering speed, and why global brands are consolidating iOS and Android codebases into a single resilient codebase.',
                    'content' => "## The Evolution of Cross-Platform Engineering\n\nFor years, software architects had to make an unenviable trade-off: build twice with native Swift and Kotlin, or accept compromise through hybrid web wrappers. Flutter disrupted that paradigm by rendering directly to the GPU via Impeller.\n\n### 1. Unified Engineering Velocity\nMaintaining separate codebases for iOS and Android creates feature parity drift, doubled bug triage, and extended release cycles. With Flutter, a single cross-functional squad builds, tests, and deploys simultaneous releases across both platforms.\n\n### 2. Native GPU-Level Performance\nBy bypassing web-view abstractions, Flutter delivers sustained 60fps and 120fps animations even across entry-level Android devices in high-growth international markets.\n\n### 3. Consistency Across Design Systems\nCustom typography, bespoke micro-interactions, and complex navigational hierarchies render with pixel-perfect fidelity across varied screen dimensions and aspect ratios.",
                    'category' => 'Mobile Engineering',
                    'author' => 'Jinshad N.U',
                    'read_time' => '6 min read',
                    'cover_image' => 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
                    'tags' => 'Flutter, Mobile, Dart, Performance, Cross-Platform',
                    'seo_title' => 'Why Flutter is Dominating Enterprise Mobile Development in 2026 | APPZIO',
                    'seo_description' => 'Discover how Flutter empowers businesses to build native-speed iOS and Android apps from a single unified codebase.',
                    'is_published' => 1
                ],
                [
                    'title' => 'Architecting High-Performance Headless Web Platforms for Modern Agencies',
                    'slug' => 'architecting-high-performance-headless-web-platforms',
                    'excerpt' => 'How decoupling frontend presentation with React and Tailwind from high-throughput REST APIs delivers unmatched page speed, SEO rankings, and total operational flexibility.',
                    'content' => "## The Death of Monolithic Web Systems\n\nTraditional monolithic websites bundle presentation, database management, and business logic into a single rigid layer. When visitor traffic spikes, the entire stack suffers latency.\n\n### The Headless Advantage\nBy separating the presentation layer (built with React, Vite, and Tailwind CSS) from a lightning-fast PHP 8+ REST API, agencies unlock:\n\n- Sub-second first contentful paint (FCP)\n- Flawless Core Web Vitals scoring\n- True multitenant scalability\n- Zero downtime frontend deployments\n\nAt APPZIO, we engineer digital products with this exact separation of concerns, providing our clients with enterprise-grade stability at an agile development cadence.",
                    'category' => 'Web Architecture',
                    'author' => 'APPZIO Engineering',
                    'read_time' => '5 min read',
                    'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
                    'tags' => 'React, Web Architecture, PHP, REST API, Performance',
                    'seo_title' => 'Architecting High-Performance Headless Web Platforms | APPZIO',
                    'seo_description' => 'Learn how modern decoupled web architectures supercharge performance and conversion rates for modern businesses.',
                    'is_published' => 1
                ],
                [
                    'title' => 'UI/UX Principles That Convert: Building Trust in High-Value B2B Digital Products',
                    'slug' => 'ui-ux-principles-that-convert-high-value-b2b',
                    'excerpt' => 'Why minimalist editorial typography, purposeful negative space, and cohesive micro-interactions are the secret weapons of world-class digital agency websites.',
                    'content' => "## The Psychology of Digital Trust\n\nWhen high-ticket clients or international enterprise decision-makers land on your website, they form an assessment within 50 milliseconds. Generic layouts, chaotic gradients, and cluttered navigation signal amateur execution.\n\n### Key Principles of Modern Digital Agency Design:\n\n1. **Intentional White Space:** Generous margins and breathing room allow your portfolio pieces and value proposition to command respect.\n2. **Sophisticated Typography:** Pairing an editorial display font with a crisp, geometric sans-serif communicates confidence.\n3. **Restrained Gradients & Glows:** Gradients should elevate focal actions—like primary CTAs and active states—rather than overwhelming the layout.\n4. **Frictionless Inquiries:** A project enquiry form must feel conversational, structured, and reassuring.",
                    'category' => 'UI/UX Design',
                    'author' => 'APPZIO Creative Studio',
                    'read_time' => '4 min read',
                    'cover_image' => 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
                    'tags' => 'UI/UX, Agency Design, Product Design, Conversion',
                    'seo_title' => 'UI/UX Principles That Convert in High-Value B2B | APPZIO',
                    'seo_description' => 'Master the visual design and user experience strategies that transform casual visitors into high-value clients.',
                    'is_published' => 1
                ]
            ];

            $insertStmt = $pdo->prepare("INSERT INTO blogs (title, slug, excerpt, content, category, author, read_time, cover_image, tags, seo_title, seo_description, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($blogs as $b) {
                $insertStmt->execute([
                    $b['title'], $b['slug'], $b['excerpt'], $b['content'], $b['category'],
                    $b['author'], $b['read_time'], $b['cover_image'], $b['tags'],
                    $b['seo_title'], $b['seo_description'], $b['is_published']
                ]);
            }
        }
    }
}
