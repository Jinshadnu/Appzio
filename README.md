# APPZIO — Digital Agency & Software Engineering

> **Transforming Ideas Into Resilient Digital Experiences.**  
> Full-lifecycle digital product development based in **Kerala, India**, delivering high-performance websites, mobile applications, and enterprise custom software for global clients.

---

## 🌟 Key Features

- **Modern Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
- **Full Backend API**: High-performance PHP 8+ REST API with JWT Bearer authentication, rate limiting, and input sanitization.
- **Database Flexibility**: Zero-config SQLite fallback for local development + production MySQL / MariaDB support.
- **Complete Admin CMS**:
  - Live Dashboard metrics & recent inquiries
  - Website Settings & Branding Editor
  - Service Management (CRUD)
  - Case Studies & Portfolio Manager
  - Testimonials & Client Reviews Manager
  - Contact Form Submissions with CSV Export
- **Automated GitHub Pages Deployment**: GitHub Actions workflow included in `.github/workflows/deploy.yml`.

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Jinshadnu/Appzio.git
cd Appzio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development
```bash
# Terminal 1: Start PHP REST API backend
php -S 127.0.0.1:8085 -t api api/index.php

# Terminal 2: Start Vite React frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔐 Admin Panel Credentials

- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@appzio.com`
- **Password**: `Appzio@2026!`

*(Credentials can be changed anytime from the Admin Profile section).*

---

## 🌐 Production Hosting

### A. Hostinger / Apache Shared Hosting
Follow the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

### B. GitHub Pages (Static Frontend)
This repository includes a GitHub Actions workflow that automatically builds and deploys the frontend to GitHub Pages upon pushing to `main`.
1. Go to your repository on GitHub: **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Push to `main` to trigger the automated deployment!

---

## 📞 Contact & Business Inquiries

- **Location**: Kerala, India
- **Phone / WhatsApp**: [+91 9526026636](https://wa.me/919526026636)
- **Email**: appzio@gmail.com
- **Website**: https://github.com/Jinshadnu/Appzio

---

© 2026 APPZIO. All Rights Reserved.

