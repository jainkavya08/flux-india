# FLUX India - Database Documentation & Setup Guide

This directory contains the MySQL schema and setup scripts for the FLUX India BOM Procurement backend.

---

## 1. Tables Overview

### `bom_submissions`
Stores all customer Bill of Materials (BOM) requests and sourcing inquiries.

| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT UNSIGNED` | No | Auto-increment Primary Key |
| `contact_name` | `VARCHAR(150)` | No | Customer full name |
| `company_name` | `VARCHAR(200)` | No | Customer company / panel shop name |
| `business_email` | `VARCHAR(255)` | No | Customer contact email |
| `phone` | `VARCHAR(50)` | No | Contact phone / mobile number |
| `requirements` | `TEXT` | No | Component part numbers, quantities, and specs |
| `bom_filename` | `VARCHAR(255)` | Yes | Original uploaded file name (e.g. `BOM_Switchgear.xlsx`) |
| `bom_filepath` | `VARCHAR(500)` | Yes | Secure random storage name/path (e.g. `a1b2c3...xlsx`) |
| `submitted_at` | `DATETIME` | No | Timestamp of submission |
| `status` | `VARCHAR(30)` | No | Default: `'New'`. Values: `'New'`, `'Reviewed'`, `'Quoted'`, `'Closed'` |

**Indexes:**
- `idx_submitted_at` on `submitted_at DESC` (for fast dashboard sorting)
- `idx_status` on `status` (for dashboard filtering)
- `idx_business_email` on `business_email` (for inquiry tracking)
- `idx_company_name` on `company_name` (for client search)

---

### `admin_users`
Stores authenticated administrator accounts with bcrypt password hashes.

| Column | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT UNSIGNED` | No | Auto-increment Primary Key |
| `username` | `VARCHAR(50)` | No | Unique login username |
| `password_hash` | `VARCHAR(255)` | No | Bcrypt hashed password (`password_hash($pass, PASSWORD_BCRYPT)`) |
| `created_at` | `DATETIME` | No | Account creation timestamp |

---

## 2. InfinityFree Setup Instructions

### Step 1: Create the MySQL Database in InfinityFree
1. Log in to the InfinityFree Control Panel (vPanel).
2. Go to **MySQL Databases**.
3. Create a new database named `flux` (your full DB name will look like `if0_12345678_flux`).
4. Note your credentials:
   - **MySQL Hostname:** (e.g. `sql100.infinityfree.com`)
   - **Database Name:** (e.g. `if0_12345678_flux`)
   - **Database Username:** (e.g. `if0_12345678`)
   - **Database Password:** (Your InfinityFree account password)

### Step 2: Import Schema via phpMyAdmin
1. In InfinityFree vPanel, click **phpMyAdmin** next to your database.
2. Select your database from the left sidebar.
3. Click the **SQL** tab at the top.
4. Copy the entire contents of [schema.sql](file:///home/kai/Documents/flux/flux-india/database/schema.sql) and paste it into the query box.
5. Click **Go** to create the tables.

### Step 3: Create the First Admin Account
Run `database/create-admin.php` locally or via CLI:
```bash
php database/create-admin.php admin "YourSecretPassword123"
```
Copy the generated `INSERT INTO admin_users ...` SQL statement and run it in the phpMyAdmin SQL tab.
