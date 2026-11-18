-- APPZIO Complete Database Export for Hostinger MySQL
-- Domain: appzio.net
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB 10.3+

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- 1. Users Table (Admin)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Settings Table
CREATE TABLE IF NOT EXISTS `settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY,
  `setting_value` LONGTEXT,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `client` VARCHAR(150),
  `tagline` VARCHAR(255),
  `short_description` TEXT,
  `overview` LONGTEXT,
  `objectives` LONGTEXT,
  `challenges` LONGTEXT,
  `solutions` LONGTEXT,
  `key_features` LONGTEXT,
  `technologies` LONGTEXT,
  `thumbnail` VARCHAR(255),
  `cover_image` VARCHAR(255),
  `gallery_images` LONGTEXT,
  `live_url` VARCHAR(255),
  `play_store_url` VARCHAR(255),
  `app_store_url` VARCHAR(255),
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_published` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `short_description` TEXT,
  `full_description` LONGTEXT,
  `icon_name` VARCHAR(100) DEFAULT 'Code',
  `features` LONGTEXT,
  `technologies` LONGTEXT,
  `is_active` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(150) NOT NULL,
  `client_title` VARCHAR(150),
  `company` VARCHAR(150),
  `review` TEXT NOT NULL,
  `rating` INT DEFAULT 5,
  `avatar_url` VARCHAR(255),
  `is_published` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Blogs Table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` TEXT,
  `content` LONGTEXT NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Technology',
  `author` VARCHAR(100) DEFAULT 'APPZIO Team',
  `read_time` VARCHAR(50) DEFAULT '5 min read',
  `cover_image` VARCHAR(255),
  `tags` VARCHAR(255),
  `seo_title` VARCHAR(255),
  `seo_description` TEXT,
  `is_published` TINYINT(1) DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Enquiries Table
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50),
  `company_name` VARCHAR(150),
  `service_required` VARCHAR(100),
  `estimated_budget` VARCHAR(100),
  `project_timeline` VARCHAR(100),
  `project_description` LONGTEXT NOT NULL,
  `attachment_url` VARCHAR(255),
  `status` VARCHAR(50) DEFAULT 'New',
  `internal_notes` LONGTEXT,
  `ip_address` VARCHAR(50),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. FAQs Table
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `question` VARCHAR(255) NOT NULL,
  `answer` TEXT NOT NULL,
  `category` VARCHAR(100) DEFAULT 'General',
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Records for `users`
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES (1, 'APPZIO Administrator', 'admin@appzio.com', '$2y$12$jl4GilNgXlq9jptfr6gmuuQsCqSn85w.mEbjbAG.uOpCXcoiYGJFC', 'admin', '2026-11-02 07:24:08', '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `settings`
-- --------------------------------------------------------
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('company_name', 'APPZIO', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('tagline', 'Transforming Ideas Into Digital Experiences.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('tagline_alt', 'Building Powerful Digital Experiences.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('meta_description', 'APPZIO is a premium digital agency & software development company building websites, mobile applications, and custom digital software for global clients.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('contact_email', 'appzio@gmail.com', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('contact_phone', '+91 9526026636', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('contact_whatsapp', '+91 9526026636', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('address', 'Kerala, India', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('social_linkedin', 'https://linkedin.com/company/appzio', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('social_github', 'https://github.com/appzio', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('social_instagram', 'https://instagram.com/appziodigital', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('copyright_text', '© 2026 APPZIO. All Rights Reserved. Crafted for digital excellence.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('hero_label', 'DIGITAL SOLUTIONS • CREATIVE DEVELOPMENT • TECHNOLOGY', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('hero_heading', 'Building Digital Experiences That Move Businesses Forward.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('hero_subheading', 'We design and develop powerful websites, mobile applications, and desktop software that help businesses transform ideas into impactful digital products.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('about_heading', 'Technology Meets Creativity.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('about_description', 'APPZIO is a digital development brand focused on creating innovative, scalable, and user-friendly digital solutions. We combine technical expertise with thoughtful design to turn business ideas into practical digital products.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('cta_heading', 'Have an Idea? Let’s Build Something Great.', '2026-11-02 07:24:08');
INSERT INTO `settings` (`setting_key`, `setting_value`, `updated_at`) VALUES ('cta_description', 'Whether you need a website, mobile application, or custom software, let’s turn your vision into a powerful digital solution.', '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `projects`
-- --------------------------------------------------------
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (1, 'AetherPay — Next-Gen Fintech Mobile & Web Platform', 'aetherpay-fintech-platform', 'Mobile Applications', 'Aether Financial Technologies (UAE & UK)', 'Multi-currency digital wallet & instant borderless transfer solution', 'A high-security, multi-currency mobile fintech application supporting cross-border remittances, biometric payments, and real-time expense tracking across GCC and Europe.', 'Aether Financial sought to build a compliant, lightning-fast digital wallet catering to expatriates and international enterprises across the UAE and UK. APPZIO designed and engineered the entire mobile application ecosystem using Flutter alongside a fortified PHP REST backend.', '• Deliver sub-second cross-currency transfers with dynamic FX rates.\\n• Achieve bank-grade end-to-end encryption and biometrics.\\n• Maintain 60fps micro-animations on both low-end and flagship smartphones.', 'Integrating multiple banking payment gateways with stringent PCI-DSS compliance while guaranteeing offline transaction queueing and synchronization.', 'Architected a reactive Flutter frontend with state-driven local caching, backed by asynchronous webhook workers and biometric encryption vaults.', '["Instant Multi-Currency Wallet (USD, AED, EUR, GBP, INR)","Biometric Touch ID & Face ID Quick Sign-in","Real-time FX Rate Live Stream & Conversion Calculator","Dynamic QR Code Point-of-Sale Checkout","Automated PDF Statement Generation & Tax Exports"]', '["Flutter","Dart","PHP","MySQL","Firebase","REST APIs","Node.js"]', '/assets/projects/aetherpay-thumb.png', '/assets/projects/aetherpay-cover.png', '["\\/assets\\/projects\\/aetherpay-thumb.png","\\/assets\\/projects\\/aetherpay-cover.png"]', 'https://aetherpay.example.com', 'https://play.google.com/store/apps/details?id=com.aetherpay.app', 'https://apps.apple.com/app/aetherpay/id123456789', 1, 1, 1, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (2, 'Novus Omnichannel Logistics ERP', 'novus-logistics-erp', 'Custom Software', 'Novus Global Freight Lines (Saudi Arabia & Qatar)', 'Enterprise freight forwarding & fleet dispatch tracking system', 'An enterprise freight automation dashboard and dispatcher system handling container tracking, automated customs documentation, and predictive fleet route optimization.', 'Novus Freight manages over 1,200 active road transports and sea containers daily across the Gulf region. They required an all-in-one software ecosystem to replace fragmented legacy spreadsheets with a cohesive, real-time command portal.', '• Consolidate container tracking into a single unified dashboard.\\n• Automate customs clearance documentation workflows.\\n• Provide real-time GPS telemetry to clients.', 'Processing high-frequency telematics data streams from cross-border fleets while providing snappy search across millions of historical cargo records.', 'Engineered a React + TypeScript single page portal paired with a high-throughput PHP/MySQL data engine with indexed spatial geometry.', '["Live Interactive Map Fleet Telemetry & Geofence Alerts","Automated Customs Waybill Generation with QR Verification","Multi-warehouse Inventory Ingestion & Stock Valuation","Driver Dispatch Mobile Companion Portal","Customer Self-service Tracking Widget"]', '["React","TypeScript","Tailwind CSS","PHP","MySQL","REST APIs"]', '/assets/projects/novus-thumb.png', '/assets/projects/novus-cover.png', '["\\/assets\\/projects\\/novus-thumb.png","\\/assets\\/projects\\/novus-cover.png"]', 'https://novuslogistics.example.com', NULL, NULL, 1, 1, 2, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (3, 'Lumina Dental & Medical Clinic Management Suite', 'lumina-medical-suite', 'Desktop Applications', 'Lumina Health Group (Europe & UAE)', 'High-performance desktop clinical management & imaging station', 'A dedicated desktop application for healthcare practitioners featuring local DICOM imaging rendering, appointment scheduling, and automated prescription management.', 'Healthcare clinics demand zero-downtime desktop reliability. APPZIO developed a cross-platform desktop suite allowing doctors to view patient records, review high-res medical X-rays locally, and coordinate appointments even during internet interruptions.', '• Local offline-first medical record repository.\\n• High-fidelity DICOM radiographic viewer integration.\\n• Seamless hardware synchronization with barcode scanners and thermal printers.', 'Ensuring strict compliance with GDPR medical privacy protocols while enabling rapid local caching and silent cloud background sync.', 'Constructed a robust desktop software utilizing Flutter Desktop and local SQLite encrypted databases with dual-sync background bridges.', '["Offline-First Patient History & Treatment Planning","Integrated Digital Radiography & High-Res Image Annotator","Thermal Prescription & Receipt Printing","EHR\\/EMR Cloud Synchronization with AES-256 Vaulting"]', '["Flutter Desktop","Dart","SQLite","REST APIs","Node.js"]', '/assets/projects/lumina-thumb.png', '/assets/projects/lumina-cover.png', '["\\/assets\\/projects\\/lumina-thumb.png","\\/assets\\/projects\\/lumina-cover.png"]', 'https://luminaclinic.example.com', NULL, NULL, 1, 1, 3, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (4, 'Krona Luxury Architectural Studio Web Experience', 'krona-architectural-web', 'Websites', 'Krona Architects (Milan & London)', 'Award-winning digital portfolio showcasing premium architecture', 'An editorial, high-aesthetic web experience built with smooth page transitions, interactive 3D spatial renders, and responsive typography that elevated client inquiries by 240%.', 'Krona Architects needed a web presence reflecting their minimalist, sculptural design ethos. APPZIO crafted a bespoke website combining clean editorial layout with subtle WebGL shaders and effortless portfolio filtering.', '• Editorial typography inspired by international architectural publications.\\n• Fluid navigation and instant image loading.\\n• Direct integration with architectural project enquiry workflows.', 'Delivering rich full-bleed 4K architectural photography without compromising on 95+ Core Web Vitals performance scores.', 'Implemented modern responsive WebP image pipelines, intersection-observer lazy-loading, and Framer Motion micro-interactions.', '["Full-bleed Interactive Portfolio Gallery with Smooth Zoom","Interactive Project Blueprint & Material Inspector","Dark \\/ Light Architectural Theme Switcher","Client Consultation Booking System with Calendar Sync"]', '["React","TypeScript","Tailwind CSS","PHP","Framer Motion"]', '/assets/projects/krona-thumb.png', '/assets/projects/krona-cover.png', '["\\/assets\\/projects\\/krona-thumb.png","\\/assets\\/projects\\/krona-cover.png"]', 'https://krona-studio.example.com', NULL, NULL, 1, 1, 4, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (5, 'PulseFit Mobile Workout Companion & AI Coach', 'pulsefit-ai-workout-app', 'Mobile Applications', 'PulseFit Inc. (India & USA)', 'Interactive workout tracker & AI personal fitness guidance', 'A modern mobile application featuring personalized workout plans, Bluetooth wearable heart-rate telemetry, video coaching, and community challenge boards.', 'PulseFit empowers fitness enthusiasts to track sets, monitor heart-rate zones in real-time, and follow adaptive workout regimens generated by fitness trainers.', '• Real-time Bluetooth BLE sync with smart bands.\\n• Smooth 60fps workout timer and interval animations.\\n• Social leaderboards and challenge milestones.', 'Accurate background timer execution without OS battery-saver termination on Android and iOS.', 'Developed custom native background services in Kotlin and Swift with Flutter UI presentation layers.', '["Real-time Bluetooth BLE Smartwatch & Heart Rate Sync","Offline Exercise Database with HD Exercise Demonstrations","Dynamic Calorie & Macro Target Calculations","Community Leaderboard & Streak Gamification"]', '["Flutter","Dart","Kotlin","Firebase","REST APIs"]', '/assets/projects/pulsefit-thumb.png', '/assets/projects/pulsefit-cover.png', '["\\/assets\\/projects\\/pulsefit-thumb.png","\\/assets\\/projects\\/pulsefit-cover.png"]', 'https://pulsefitapp.example.com', 'https://play.google.com/store/apps/details?id=com.pulsefit.app', 'https://apps.apple.com/app/pulsefit/id987654321', 1, 1, 5, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `projects` (`id`, `title`, `slug`, `category`, `client`, `tagline`, `short_description`, `overview`, `objectives`, `challenges`, `solutions`, `key_features`, `technologies`, `thumbnail`, `cover_image`, `gallery_images`, `live_url`, `play_store_url`, `app_store_url`, `is_featured`, `is_published`, `display_order`, `created_at`, `updated_at`) VALUES (6, 'Apex SaaS Analytics & Infrastructure Monitoring', 'apex-saas-analytics-suite', 'UI/UX Design', 'Apex Cloud Systems (Singapore & Germany)', 'Comprehensive enterprise design system & UI/UX architecture', 'End-to-end UX research, wireframing, high-fidelity UI design, and complete component design library for a multi-tenant cloud monitoring dashboard.', 'Apex Cloud Systems needed to overhaul their legacy server monitoring platform into a sleek, dark-themed SaaS experience that reduces cognitive overload for DevOps engineers.', '• Design over 80+ unique responsive dashboard screens.\\n• Create a scalable tokenized Figma design system.\\n• Facilitate seamless developer implementation.', 'Organizing high-density metrics, logs, and server graphs into an intuitive visual hierarchy with high contrast and zero visual fatigue.', 'Established a scientific dark-mode color palette, custom data-visualization components, and micro-interactions tested with DevOps professionals.', '["Comprehensive 120+ Component Figma Design System","Custom Color-blind Friendly Data Visualization Palettes","Interactive Micro-prototypes with Realistic Hover States","Complete Tailwind CSS Design Tokens Specification"]', '["Figma","UI\\/UX Design","Tailwind CSS","React"]', '/assets/projects/apex-thumb.png', '/assets/projects/apex-cover.png', '["\\/assets\\/projects\\/apex-thumb.png","\\/assets\\/projects\\/apex-cover.png"]', 'https://apexcloud.example.com', NULL, NULL, 1, 1, 6, '2026-11-02 07:24:08', '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `services`
-- --------------------------------------------------------
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (1, 'Website Development', 'website-development', 'Modern, responsive, SEO-friendly websites tailored to your business goals and built with cutting-edge web technologies.', 'We create high-converting, lightning-fast digital storefronts, corporate portals, and SaaS web applications designed with modern architecture and seamless UX.', 'Globe', '["Custom Next.js & React Architectures","Ultra-fast Core Web Vitals Optimization","Enterprise Headless CMS Integration","Full Mobile & Tablet Responsiveness"]', '["React","TypeScript","Tailwind CSS","PHP","Node.js","Next.js"]', 1, 1, '2026-11-02 07:24:08');
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (2, 'Mobile Application Development', 'mobile-application-development', 'Powerful native and cross-platform Android and iOS applications built with Flutter and Kotlin for maximum engagement.', 'From initial concept and user journey mapping to App Store and Google Play publishing, we build resilient mobile apps with butter-smooth animations and offline capabilities.', 'Smartphone', '["Cross-Platform Flutter & Native Kotlin","Secure Authentication & Biometrics","Real-time WebSocket & Push Notifications","Offline-First Local Storage"]', '["Flutter","Dart","Kotlin","Java","Firebase","REST APIs"]', 1, 2, '2026-11-02 07:24:08');
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (3, 'Desktop Application Development', 'desktop-application-development', 'Reliable cross-platform desktop software and business management applications tailored for heavy workflows.', 'Engineered for high performance, hardware connectivity, and robust offline stability across macOS, Windows, and Linux environments.', 'Monitor', '["Cross-platform macOS, Windows & Linux","Local hardware & peripheral integration","High-throughput data processing","Automated background updater"]', '["Flutter Desktop","Electron","Node.js","SQLite","C++"]', 1, 3, '2026-11-02 07:24:08');
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (4, 'Custom Software Development', 'custom-software-development', 'Tailored digital solutions, enterprise dashboards, CRM systems, and automated workflows designed around your business.', 'We solve bespoke operational bottlenecks by engineering tailored digital products with modular architecture, strict data security, and scalable infrastructure.', 'Cpu', '["Scalable Microservices Architecture","Custom ERP & CRM Portals","Automated Business Workflows","Role-based Access Control (RBAC)"]', '["PHP","Node.js","MySQL","PostgreSQL","Docker","Redis"]', 1, 4, '2026-11-02 07:24:08');
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (5, 'UI/UX Design', 'ui-ux-design', 'Beautiful, intuitive, user-focused digital experiences that captivate users and elevate brand perception.', 'We craft high-fidelity Figma prototypes, interactive design systems, and user-centric wireframes that balance aesthetics with frictionless usability.', 'Layout', '["Comprehensive Figma Design Systems","Interactive Prototypes & Wireframing","User Journey & Empathy Mapping","Design-to-Code Precision Handoff"]', '["Figma","Adobe XD","Protopie","Design Systems"]', 1, 5, '2026-11-02 07:24:08');
INSERT INTO `services` (`id`, `title`, `slug`, `short_description`, `full_description`, `icon_name`, `features`, `technologies`, `is_active`, `display_order`, `created_at`) VALUES (6, 'Maintenance & Support', 'maintenance-and-support', 'Continuous improvements, performance optimization, security auditing, bug fixing, and SLA-backed technical support.', 'Ensure your digital platforms operate with 99.9% uptime, zero security vulnerabilities, and uninterrupted performance with our dedicated engineering care.', 'ShieldCheck', '["24\\/7 Server & API Health Monitoring","Security Patches & Vulnerability Audits","Database Optimization & Backups","Version Upgrades & Speed Enhancements"]', '["CI\\/CD","Git","Linux Server","Monitoring Tools"]', 1, 6, '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `testimonials`
-- --------------------------------------------------------
INSERT INTO `testimonials` (`id`, `client_name`, `client_title`, `company`, `review`, `rating`, `avatar_url`, `is_published`, `display_order`, `created_at`) VALUES (1, 'Alexander Wright', 'Chief Technology Officer', 'Aether Financial Technologies (London, UK)', 'Working with APPZIO was a game-changer for our fintech product launch. Their technical mastery of Flutter and backend architecture ensured our app delivered bank-grade reliability with an exceptionally refined, modern interface. They hit every milestone ahead of schedule.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80', 1, 1, '2026-11-02 07:24:08');
INSERT INTO `testimonials` (`id`, `client_name`, `client_title`, `company`, `review`, `rating`, `avatar_url`, `is_published`, `display_order`, `created_at`) VALUES (2, 'Rashid Al-Maktoum', 'Managing Director', 'Novus Freight Logistics (Dubai, UAE)', 'APPZIO engineered our regional logistics portal from the ground up. Their team has rare dual-competence: deep architectural knowledge coupled with an intuitive eye for premium UX. Our dispatch times plummeted by 40% in the first quarter of deployment.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80', 1, 2, '2026-11-02 07:24:08');
INSERT INTO `testimonials` (`id`, `client_name`, `client_title`, `company`, `review`, `rating`, `avatar_url`, `is_published`, `display_order`, `created_at`) VALUES (3, 'Elena Rossi', 'Principal Architect & Partner', 'Krona Architectural Studio (Milan, Italy)', 'We approached APPZIO with an uncompromising aesthetic vision for our architectural portfolio. They translated our concepts into a silky-smooth, responsive digital reality. Our international client inquiries surged immediately.', 5, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80', 1, 3, '2026-11-02 07:24:08');
INSERT INTO `testimonials` (`id`, `client_name`, `client_title`, `company`, `review`, `rating`, `avatar_url`, `is_published`, `display_order`, `created_at`) VALUES (4, 'Dr. Julian Weber', 'Head of Medical Operations', 'Lumina Health Group (Munich, Germany)', 'Building desktop software for healthcare requires absolute precision and zero margin for error. APPZIO delivered an offline-first desktop suite that our clinical staff enjoys using every single day. Their ongoing support is unmatched.', 5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80', 1, 4, '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `blogs`
-- --------------------------------------------------------
INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `author`, `read_time`, `cover_image`, `tags`, `seo_title`, `seo_description`, `is_published`, `created_at`, `updated_at`) VALUES (1, 'Why Cross-Platform Flutter is Dominating Enterprise Mobile Development in 2026', 'why-flutter-dominates-enterprise-mobile-2026', 'An in-depth analysis of Flutter’s architectural maturity, rendering speed, and why global brands are consolidating iOS and Android codebases into a single resilient codebase.', '## The Evolution of Cross-Platform Engineering\n\nFor years, software architects had to make an unenviable trade-off: build twice with native Swift and Kotlin, or accept compromise through hybrid web wrappers. Flutter disrupted that paradigm by rendering directly to the GPU via Impeller.\n\n### 1. Unified Engineering Velocity\nMaintaining separate codebases for iOS and Android creates feature parity drift, doubled bug triage, and extended release cycles. With Flutter, a single cross-functional squad builds, tests, and deploys simultaneous releases across both platforms.\n\n### 2. Native GPU-Level Performance\nBy bypassing web-view abstractions, Flutter delivers sustained 60fps and 120fps animations even across entry-level Android devices in high-growth international markets.\n\n### 3. Consistency Across Design Systems\nCustom typography, bespoke micro-interactions, and complex navigational hierarchies render with pixel-perfect fidelity across varied screen dimensions and aspect ratios.', 'Mobile Engineering', 'Jinshad N.U', '6 min read', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80', 'Flutter, Mobile, Dart, Performance, Cross-Platform', 'Why Flutter is Dominating Enterprise Mobile Development in 2026 | APPZIO', 'Discover how Flutter empowers businesses to build native-speed iOS and Android apps from a single unified codebase.', 1, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `author`, `read_time`, `cover_image`, `tags`, `seo_title`, `seo_description`, `is_published`, `created_at`, `updated_at`) VALUES (2, 'Architecting High-Performance Headless Web Platforms for Modern Agencies', 'architecting-high-performance-headless-web-platforms', 'How decoupling frontend presentation with React and Tailwind from high-throughput REST APIs delivers unmatched page speed, SEO rankings, and total operational flexibility.', '## The Death of Monolithic Web Systems\n\nTraditional monolithic websites bundle presentation, database management, and business logic into a single rigid layer. When visitor traffic spikes, the entire stack suffers latency.\n\n### The Headless Advantage\nBy separating the presentation layer (built with React, Vite, and Tailwind CSS) from a lightning-fast PHP 8+ REST API, agencies unlock:\n\n- Sub-second first contentful paint (FCP)\n- Flawless Core Web Vitals scoring\n- True multitenant scalability\n- Zero downtime frontend deployments\n\nAt APPZIO, we engineer digital products with this exact separation of concerns, providing our clients with enterprise-grade stability at an agile development cadence.', 'Web Architecture', 'APPZIO Engineering', '5 min read', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'React, Web Architecture, PHP, REST API, Performance', 'Architecting High-Performance Headless Web Platforms | APPZIO', 'Learn how modern decoupled web architectures supercharge performance and conversion rates for modern businesses.', 1, '2026-11-02 07:24:08', '2026-11-02 07:24:08');
INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `author`, `read_time`, `cover_image`, `tags`, `seo_title`, `seo_description`, `is_published`, `created_at`, `updated_at`) VALUES (3, 'UI/UX Principles That Convert: Building Trust in High-Value B2B Digital Products', 'ui-ux-principles-that-convert-high-value-b2b', 'Why minimalist editorial typography, purposeful negative space, and cohesive micro-interactions are the secret weapons of world-class digital agency websites.', '## The Psychology of Digital Trust\n\nWhen high-ticket clients or international enterprise decision-makers land on your website, they form an assessment within 50 milliseconds. Generic layouts, chaotic gradients, and cluttered navigation signal amateur execution.\n\n### Key Principles of Modern Digital Agency Design:\n\n1. **Intentional White Space:** Generous margins and breathing room allow your portfolio pieces and value proposition to command respect.\n2. **Sophisticated Typography:** Pairing an editorial display font with a crisp, geometric sans-serif communicates confidence.\n3. **Restrained Gradients & Glows:** Gradients should elevate focal actions—like primary CTAs and active states—rather than overwhelming the layout.\n4. **Frictionless Inquiries:** A project enquiry form must feel conversational, structured, and reassuring.', 'UI/UX Design', 'APPZIO Creative Studio', '4 min read', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', 'UI/UX, Agency Design, Product Design, Conversion', 'UI/UX Principles That Convert in High-Value B2B | APPZIO', 'Master the visual design and user experience strategies that transform casual visitors into high-value clients.', 1, '2026-11-02 07:24:08', '2026-11-02 07:24:08');

-- --------------------------------------------------------
-- Records for `enquiries`
-- --------------------------------------------------------
INSERT INTO `enquiries` (`id`, `full_name`, `email`, `phone`, `company_name`, `service_required`, `estimated_budget`, `project_timeline`, `project_description`, `attachment_url`, `status`, `internal_notes`, `ip_address`, `created_at`) VALUES (1, 'Khalid Al-Mansoor', 'khalid@mansoorgroup.ae', '+971 50 999 8888', 'Al-Mansoor Digital Holdings', 'Mobile Application Development', '$15,000 – $30,000', '2 – 4 Months', 'We require a high-concurrency cross-platform Flutter application for our logistics tracking and courier operations across the GCC.', '', 'New', NULL, '127.0.0.1', '2026-11-02 07:40:56');
INSERT INTO `enquiries` (`id`, `full_name`, `email`, `phone`, `company_name`, `service_required`, `estimated_budget`, `project_timeline`, `project_description`, `attachment_url`, `status`, `internal_notes`, `ip_address`, `created_at`) VALUES (2, 'Sarah Connor', 'sarah@example.com', '+919526026636', '', '', '', '', 'Interested in building a mobile application with APPZIO.', '', 'New', NULL, '127.0.0.1', '2026-11-02 17:27:27');

-- --------------------------------------------------------
-- Records for `faqs`
-- --------------------------------------------------------
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (1, 'What services does APPZIO provide?', 'APPZIO specializes in full-lifecycle digital product development: high-performance Websites, cross-platform Mobile Applications (Android & iOS with Flutter/Kotlin), Desktop Software (macOS, Windows, Linux), Custom Enterprise Software, UI/UX Design Systems, API Development, and 24/7 SLA Maintenance & Optimization.', 'General', 1, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (2, 'Can you develop both websites and mobile applications?', 'Yes, absolutely. We frequently engineer end-to-end product ecosystems where web apps, customer mobile apps, and administrative backend portals share a centralized, unified API and design system for seamless business continuity.', 'General', 2, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (3, 'Do you develop custom desktop applications?', 'Yes. We specialize in cross-platform desktop applications (built with Flutter Desktop, Electron, and C++ runtimes) engineered for heavy data workflows, local hardware interfacing (scanners, printers, medical devices), and robust offline performance.', 'General', 3, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (4, 'Can you work with international clients?', 'Yes. We proudly collaborate with startups, SMEs, and international companies across India, UAE, Saudi Arabia, Qatar, Europe, the UK, and North America. We accommodate global time zones, provide bilingual project management, and execute contracts with complete NDA confidentiality.', 'General', 4, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (5, 'How does your development process work?', 'Our 6-step engineering methodology comprises: 1. Discovery (goals and architecture mapping), 2. Planning (user stories and roadmap), 3. Design (Figma UI/UX & interactive prototypes), 4. Development (clean, modular code), 5. Quality Assurance (performance & vulnerability testing), and 6. Launch & Ongoing SLA Support.', 'General', 5, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (6, 'Do you provide maintenance and support after launch?', 'Yes. Every project includes complimentary post-launch support. Additionally, we provide monthly maintenance packages encompassing server monitoring, security patching, OS version compatibility updates, and continuous feature expansion.', 'General', 6, 1);
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`) VALUES (7, 'How can I get a project quotation?', 'You can submit our Project Enquiry form or reach out directly via WhatsApp or email (contact@appzio.com). We will analyze your specifications and provide a detailed scope breakdown, timeline estimate, and milestone quotation within 24 to 48 hours.', 'General', 7, 1);

COMMIT;