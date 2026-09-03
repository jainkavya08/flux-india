# FLUX India — Backend API Documentation

All API endpoints reside under `/api/` and return consistent UTF-8 encoded JSON responses.

---

## Response Envelope Standard

### Success Response Format:
```json
{
  "success": true,
  "message": "Human readable confirmation message.",
  "data": {}
}
```

### Error Response Format:
```json
{
  "success": false,
  "message": "Specific error description.",
  "field": "optional_field_name"
}
```

---

## Public Endpoints

### 1. Submit BOM / Procurement Inquiry
Submits customer contact details, component line items, and an optional uploaded BOM file (PDF, Excel, CSV, TXT).

- **URL:** `POST /api/submit-bom.php`
- **Authentication:** None (Public)
- **Content-Type:** `multipart/form-data`

#### Request Fields:
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `contact_name` | `string` | **Yes** | Customer full name (max 150 chars) |
| `company_name` | `string` | **Yes** | Company / Panel Shop name (max 200 chars) |
| `business_email` | `string` | **Yes** | Valid business email address |
| `phone` | `string` | **Yes** | Contact phone / mobile number |
| `requirements` | `string` | **Yes** | Component part numbers, quantities, specs |
| `bom_file` | `file` | *Optional* | Uploaded BOM attachment (PDF, CSV, XLS, XLSX, TXT up to 10 MB) |

#### Example Success Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Your BOM has been submitted successfully. Our engineering team will review it and deliver your consolidated quotation within 24 hours.",
  "id": 14,
  "referenceNumber": "BOM-00014",
  "submissionId": 14
}
```

#### Example Error Response (`HTTP 400` / `HTTP 500`):
```json
{
  "success": false,
  "message": "Invalid file type. Allowed formats: PDF, CSV, Excel (.xls, .xlsx), and TXT.",
  "field": "bom_file"
}
```

---

## Admin Endpoints (Session Authenticated)

All admin endpoints enforce PHP session authentication via cookies (`PHPSESSID`). Unauthenticated requests will receive `HTTP 401 Unauthorized`.

---

### 2. Admin Login & Session Status
Authenticates admin credentials or checks active session status.

- **URL:** `POST /api/admin-login.php` (or `GET` to check active session)
- **Authentication:** Public
- **Content-Type:** `application/json` or `application/x-www-form-urlencoded`

#### Request Body (POST):
```json
{
  "username": "admin",
  "password": "YourAdminPassword"
}
```

#### Success Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Login successful.",
  "username": "admin"
}
```

---

### 3. Admin Logout
Terminates the PHP session securely and expires the session cookie.

- **URL:** `POST /api/admin-logout.php`
- **Authentication:** Admin Session

#### Success Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

### 4. List Submissions (Search & Pagination)
Returns summary statistics and a paginated, filterable list of customer BOM submissions.

- **URL:** `GET /api/admin-submissions.php`
- **Authentication:** Admin Session

#### Query Parameters:
| Param | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `integer` | `1` | Page number |
| `limit` | `integer` | `20` | Submissions per page (max 100) |
| `status` | `string` | `""` | Filter by status (`New`, `Reviewed`, `Quoted`, `Closed`) |
| `search` | `string` | `""` | Search term across contact, company, email, phone, requirements |

#### Example Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Submissions retrieved successfully.",
  "stats": {
    "total": 35,
    "new": 10,
    "reviewed": 8,
    "quoted": 12,
    "closed": 5
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalFiltered": 35,
    "totalPages": 2
  },
  "submissions": [
    {
      "id": 14,
      "referenceCode": "BOM-00014",
      "contact_name": "Rahul Sharma",
      "company_name": "Apex Automation Pvt Ltd",
      "business_email": "rahul@apexauto.in",
      "phone": "+91 98220 00000",
      "requirements": "3P 250A MCCB Schneider (Qty: 2)\nS7-1200 CPU 1214C (Qty: 1)",
      "has_bom_file": true,
      "bom_filename": "Apex_Plant_Switchgear_BOM.xlsx",
      "status": "New",
      "submitted_at": "2026-09-03 15:14:22",
      "formatted_date": "03 Sep 2026, 03:14 PM"
    }
  ]
}
```

---

### 5. Get Single Submission Detail
Fetches full details for a single BOM record.

- **URL:** `GET /api/admin-submission.php?id=14`
- **Authentication:** Admin Session

#### Success Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Submission details retrieved.",
  "submission": {
    "id": 14,
    "referenceCode": "BOM-00014",
    "contact_name": "Rahul Sharma",
    "company_name": "Apex Automation Pvt Ltd",
    "business_email": "rahul@apexauto.in",
    "phone": "+91 98220 00000",
    "requirements": "3P 250A MCCB Schneider (Qty: 2)\nS7-1200 CPU 1214C (Qty: 1)",
    "has_bom_file": true,
    "bom_filename": "Apex_Plant_Switchgear_BOM.xlsx",
    "status": "New",
    "submitted_at": "2026-09-03 15:14:22",
    "formatted_date": "03 September 2026, 03:14 PM"
  }
}
```

---

### 6. Update Sourcing Status
Updates the lifecycle status of a BOM submission.

- **URL:** `POST /api/update-status.php`
- **Authentication:** Admin Session
- **Content-Type:** `application/json` or form data

#### Request Body:
```json
{
  "id": 14,
  "status": "Reviewed"
}
```
*Allowed Status Values:* `New`, `Reviewed`, `Quoted`, `Closed`.

#### Success Response (`HTTP 200`):
```json
{
  "success": true,
  "message": "Status updated to 'Reviewed'.",
  "id": 14,
  "status": "Reviewed"
}
```

---

### 7. Download Uploaded BOM Attachment
Securely downloads an uploaded customer BOM attachment after validating admin authentication and directory traversal limits.

- **URL:** `GET /api/download-bom.php?id=14`
- **Authentication:** Admin Session Required
- **Response:** File stream with `Content-Disposition: attachment; filename="Apex_Plant_Switchgear_BOM.xlsx"`
- **Security:** Denies unauthenticated requests (`HTTP 403`), blocks path traversal, validates real path within `/uploads/bom/`.
