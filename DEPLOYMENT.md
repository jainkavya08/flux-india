# FLUX India — InfinityFree Deployment Guide

This guide walks you through the step-by-step deployment of the Next.js static frontend and PHP/MySQL backend to **InfinityFree** (`https://fluxindia.rf.gd/`).

---

## 1. Information Required from InfinityFree

Log in to your [InfinityFree Client Area](https://app.infinityfree.com/) & Control Panel (vPanel) and gather these exact credentials:

> [!IMPORTANT]
> **Values to obtain from InfinityFree vPanel:**
> - **MySQL Hostname:** Found in vPanel under *MySQL Databases* (e.g., `sql100.infinityfree.com` — *do not use localhost*).
> - **Database Name:** Created in vPanel (e.g., `if0_12345678_flux`).
> - **Database Username:** Found in vPanel (e.g., `if0_12345678`).
> - **Database Password:** Your InfinityFree hosting account password.
> - **FTP Hostname, Username, Password:** Found under *FTP Details* in your client area.

---

## 2. Step-by-Step Deployment Walkthrough

### Step 1: Build the Static Frontend
In your local project terminal, run:
```bash
npm run build
```
This builds the Next.js application in static export mode and outputs all static HTML, CSS, JavaScript, icons, images, as well as the `/api/` and `/admin/` directories into the local **`out/`** folder.

---

### Step 2: Set Up MySQL Database in InfinityFree
1. Log in to your InfinityFree Control Panel (vPanel).
2. Click **MySQL Databases**.
3. Under *Create a New Database*, enter `flux` and click **Create Database**.
4. Note your full database name (e.g., `if0_12345678_flux`).
5. Click **phpMyAdmin** next to the newly created database.
6. In phpMyAdmin, click on your database name on the left navigation.
7. Click the **SQL** tab at the top.
8. Open [`database/schema.sql`](file:///home/kai/Documents/flux/flux-india/database/schema.sql), copy all contents, paste them into the SQL query box, and click **Go**.
   - This creates both `bom_submissions` and `admin_users` tables with all necessary indexes.

---

### Step 3: Create Your Initial Admin Account
Run the admin user tool locally to generate your bcrypt password hash:
```bash
php database/create-admin.php admin "YourSecureAdminPassword123"
```
Copy the generated `INSERT INTO admin_users ...` SQL command and run it in the phpMyAdmin SQL tab to create your admin account.

---

### Step 4: Configure `api/config.php`
1. On your local machine or in InfinityFree File Manager, copy `api/config.example.php` to `api/config.php`.
2. Fill in your actual InfinityFree MySQL credentials:
```php
<?php
if (!defined('FLUX_APP')) {
    define('FLUX_APP', true);
}

// Database Credentials
define('DB_HOST', 'sql100.infinityfree.com'); // Your actual InfinityFree MySQL hostname
define('DB_NAME', 'if0_12345678_flux');       // Your actual DB name
define('DB_USER', 'if0_12345678');            // Your actual DB username
define('DB_PASS', 'your_infinityfree_pass');  // Your vPanel account password
define('DB_PORT', '3306');

// Application Settings
define('APP_ENV', 'production');
define('ADMIN_EMAIL', 'sales@fluxindia.in');   // Email for new BOM notifications
define('FROM_EMAIL', 'noreply@fluxindia.rf.gd');

define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/bom/');
define('MAX_FILE_SIZE', 10 * 1024 * 1024);

define('ALLOWED_ORIGINS', [
    'https://fluxindia.rf.gd',
    'http://localhost:3000',
]);
```

---

### Step 5: Upload Files to InfinityFree `htdocs`
Connect to your InfinityFree account using **FileZilla FTP** (or the web File Manager):

1. Navigate to the **`htdocs/`** directory on your hosting.
2. Upload all files and folders from your local **`out/`** directory into `htdocs/`:
   - `_next/`
   - `images/`
   - `about.html`, `bom.html`, `contact.html`, `solutions.html`, `work.html`, `index.html`, etc.
3. Ensure the backend directories exist in `htdocs/`:
   - `htdocs/api/` (contains `config.php`, `db.php`, `submit-bom.php`, `admin-login.php`, `admin-logout.php`, `admin-submissions.php`, `admin-submission.php`, `update-status.php`, `download-bom.php`, `.htaccess`)
   - `htdocs/admin/` (contains `index.html`, `index.php`)
   - `htdocs/uploads/bom/` (contains `.htaccess`)
4. Set folder permissions on `htdocs/uploads/bom/` to `755` (or `777` if required by the host for PHP write access).

---

## 3. Directory Layout on InfinityFree `htdocs`

```
htdocs/
│
├── index.html, about.html, bom.html, contact.html, etc. (Static Next.js pages)
├── _next/ (Next.js scripts and static assets)
├── images/ (Brand logos and assets)
│
├── api/
│   ├── .htaccess (Blocks direct config downloads)
│   ├── config.php (Your InfinityFree MySQL credentials - NEVER commit to git)
│   ├── db.php (PDO database connection and helpers)
│   ├── submit-bom.php (BOM intake submission handler)
│   ├── admin-login.php (Session login authentication)
│   ├── admin-logout.php (Session logout)
│   ├── admin-submissions.php (Paginated submissions list & search)
│   ├── admin-submission.php (Single submission detail)
│   ├── update-status.php (Status updater)
│   └── download-bom.php (Secure authenticated file download stream)
│
├── admin/
│   ├── index.html (Responsive Flux Admin Dashboard)
│   └── index.php (Fallback router)
│
└── uploads/
    └── bom/
        └── .htaccess (Blocks direct HTTP access and script execution)
```

---

## 4. Verification & Testing Checklist

After deployment, perform these verification tests:

| Test # | Action | Expected Result |
| :--- | :--- | :--- |
| **1** | Open `https://fluxindia.rf.gd/bom` and submit form without file | Form submits, confetti triggers, record stored in `bom_submissions` table |
| **2** | Submit form with an Excel / PDF file | File uploaded into `uploads/bom/`, record created with original filename |
| **3** | Submit form with invalid email | Red error banner displayed, form not submitted |
| **4** | Open `https://fluxindia.rf.gd/admin/` | Admin login page displayed |
| **5** | Enter invalid credentials | "Invalid username or password" alert displayed |
| **6** | Enter valid credentials | Dashboard loads showing summary statistics and submissions table |
| **7** | Search by company name in Admin Search | Table dynamically filters to matching submissions |
| **8** | Click "View" on a submission with BOM file | Modal opens with customer details, line items, and Download button |
| **9** | Click "Download BOM Attachment" in Admin modal | File downloads with original filename |
| **10**| Attempt to access `/api/download-bom.php?id=1` in incognito window | Access denied (403 Forbidden) |
| **11**| Change status to "Reviewed" or "Quoted" | Status updates in database and updates badge |
| **12**| Click "Log Out" | Session destroyed, redirected to login screen |
