-- ==========================================================
-- FLUX India Database Schema
-- BOM Submissions & Admin Authentication
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB (InfinityFree)
-- ==========================================================

-- Set character set
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------
-- Table: bom_submissions
-- Stores all customer BOM submissions and procurement inquiries
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bom_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `contact_name` VARCHAR(150) NOT NULL,
  `company_name` VARCHAR(200) NOT NULL,
  `business_email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `requirements` TEXT NOT NULL,
  `bom_filename` VARCHAR(255) DEFAULT NULL,
  `bom_filepath` VARCHAR(500) DEFAULT NULL,
  `submitted_at` DATETIME NOT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'New',
  PRIMARY KEY (`id`),
  INDEX `idx_submitted_at` (`submitted_at` DESC),
  INDEX `idx_status` (`status`),
  INDEX `idx_business_email` (`business_email`),
  INDEX `idx_company_name` (`company_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: admin_users
-- Stores authenticated admin credentials (bcrypt hashed)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
