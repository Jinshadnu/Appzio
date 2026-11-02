# APPZIO — Deployment & Administration Guide for Hostinger

This guide provides instructions for deploying the **APPZIO Digital Agency Website & CMS** to Hostinger Shared Hosting (or any Apache + PHP 8+ / MySQL hosting environment).

---

## 1. System Architecture

The project is built with:
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend API:** PHP 8+ REST API (`/api/...`) with Bearer token authentication, input validation, and rate limiting
- **Database:** MySQL 5.7+ / 8.0+ / MariaDB (with zero-configuration SQLite fallback for local preview)
- **Web Server:** Apache with `.htaccess` handling both SPA client-side routing and `/api/` routing

---

## 2. Default Administrative Credentials

- **Admin Login URL:** `/admin/login`
- **Dashboard URL:** `/admin`
- **Email:** `admin@appzio.com`
- **Password:** `Appzio@2026!`

*(You can update your email, display name, and password anytime from the **Profile & Security** section in the Admin Panel.)*

---

## 3. Hostinger Deployment Steps (hPanel)

### Step 1: Create a MySQL Database on Hostinger
1. Log into your **Hostinger hPanel**.
2. Go to **Databases** → **Management**.
3. Create a new MySQL database:
   - **Database Name:** e.g., `u123456789_appzio`
   - **Database User:** e.g., `u123456789_user`
   - **Password:** Save this securely.
4. Open **phpMyAdmin** for this database and click **Import**.
5. Select the file [`api/database.sql`](file:///Users/jinshadnu/Websites/Appzio/api/database.sql) and click **Go**. All tables, initial settings, case studies, services, testimonials, and default admin will be created.

---

### Step 2: Configure Database Credentials in PHP
Edit [`api/config/database.php`](file:///Users/jinshadnu/Websites/Appzio/api/config/database.php) or set environment variables:

```php
$dbHost = getenv('DB_HOST') ?: 'localhost'; // Usually 'localhost' on Hostinger
$dbName = getenv('DB_NAME') ?: 'u123456789_appzio';
$dbUser = getenv('DB_USER') ?: 'u123456789_user';
$dbPass = getenv('DB_PASS') ?: 'YourPasswordHere';
$dbPort = getenv('DB_PORT') ?: '3306';
```

---

### Step 3: Build & Upload to Hostinger `public_html`
1. Run local production build:
   ```bash
   npm run build
   ```
2. In Hostinger **File Manager** (under `public_html/`):
   - Upload the contents of the `dist/` directory directly into `public_html/`
   - Upload the `api/` directory into `public_html/api/`
   - Upload the [`.htaccess`](file:///Users/jinshadnu/Websites/Appzio/.htaccess) file into `public_html/.htaccess`
   - Ensure `api/uploads/` has write permissions (`0755` or `0775`) for image uploads.

Your directory on Hostinger will look like:
```
public_html/
├── .htaccess             # Apache routing for React SPA + PHP API
├── index.html            # Built React SPA
├── assets/               # CSS and JS bundles
├── logo.svg              # Primary brand identity
├── logo-light.svg        # Light version of brand logo
├── favicon.svg           # Brand favicon
├── robots.txt            # Search crawler directives
├── sitemap.xml           # Google SEO sitemap
└── api/                  # PHP 8 REST API
    ├── config/
    │   ├── database.php
    │   └── auth.php
    ├── uploads/          # Case study media uploads
    ├── database.sql
    └── index.php         # REST API Router
```

---

## 4. Admin Panel Capabilities

Access `/admin/login` to manage:
1. **Dashboard:** Live metrics for projects, services, inquiries, and recent client activity.
2. **Projects Manager:** Add, edit, publish/unpublish, feature, and reorder case studies with tech stacks, challenges, solutions, and device previews.
3. **Services Manager:** Manage capabilities, descriptions, and technology badges.
4. **Enquiries Manager:** Review client project briefs, change inquiry status (`New`, `Contacted`, `In Progress`, `Completed`, `Rejected`), record internal notes, and export CSV reports.
5. **Testimonials Manager:** Add client quotes, ratings, and social proof.
6. **Blog / Insights:** Publish engineering articles with Markdown support and SEO metadata.
7. **Website Settings & Homepage:** Change brand name, tagline, hero text, contact email, phone number, WhatsApp link, and social profiles live.
8. **Profile & Security:** Update admin credentials and password.

---

## 5. Local Development Quickstart

To run locally:
1. Start the PHP API:
   ```bash
   php -S 127.0.0.1:8000 -t . api/index.php
   ```
2. Start the Vite dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

