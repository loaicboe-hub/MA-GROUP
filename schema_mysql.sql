SET FOREIGN_KEY_CHECKS = 0;

-- 1. profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `email` VARCHAR(255) DEFAULT NULL,
  `full_name` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(36) NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_role` (`user_id`, `role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. user_permissions
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

-- 4. product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `name_en` VARCHAR(255) NOT NULL DEFAULT '',
  `name_ar` VARCHAR(255) NOT NULL DEFAULT '',
  `name_zh` VARCHAR(255) DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 1,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `trade` VARCHAR(50) NOT NULL DEFAULT 'export',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. products
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `trade` VARCHAR(50) NOT NULL DEFAULT 'export',
  `category_id` VARCHAR(36) DEFAULT NULL,
  `name_en` VARCHAR(255) NOT NULL DEFAULT '',
  `name_ar` VARCHAR(255) NOT NULL DEFAULT '',
  `name_zh` VARCHAR(255) DEFAULT NULL,
  `intro_en` TEXT DEFAULT NULL,
  `intro_ar` TEXT DEFAULT NULL,
  `intro_zh` TEXT DEFAULT NULL,
  `description_en` LONGTEXT DEFAULT NULL,
  `description_ar` LONGTEXT DEFAULT NULL,
  `description_zh` LONGTEXT DEFAULT NULL,
  `specs_en` JSON DEFAULT NULL,
  `specs_ar` JSON DEFAULT NULL,
  `specs_zh` JSON DEFAULT NULL,
  `hidden_specs` JSON DEFAULT NULL,
  `main_image` LONGTEXT DEFAULT NULL,
  `gallery` JSON DEFAULT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_products_cat` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. news
CREATE TABLE IF NOT EXISTS `news` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL DEFAULT '',
  `title_ar` VARCHAR(255) NOT NULL DEFAULT '',
  `title_zh` VARCHAR(255) DEFAULT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `excerpt_ar` TEXT DEFAULT NULL,
  `excerpt_zh` TEXT DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `content_ar` LONGTEXT DEFAULT NULL,
  `content_zh` LONGTEXT DEFAULT NULL,
  `featured_image` LONGTEXT DEFAULT NULL,
  `gallery` JSON DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT '',
  `tags` JSON DEFAULT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT '',
  `video_url` TEXT DEFAULT NULL,
  `published` TINYINT(1) NOT NULL DEFAULT 0,
  `published_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. partners
CREATE TABLE IF NOT EXISTS `partners` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `logo_path` TEXT DEFAULT NULL,
  `logo_url` TEXT DEFAULT NULL,
  `url` TEXT DEFAULT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. site_settings
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY DEFAULT 'default',
  `company_name` VARCHAR(255) NOT NULL DEFAULT '',
  `phone` VARCHAR(100) NOT NULL DEFAULT '',
  `email` VARCHAR(255) NOT NULL DEFAULT '',
  `whatsapp` VARCHAR(100) NOT NULL DEFAULT '',
  `address` TEXT DEFAULT NULL,
  `maps_url` TEXT DEFAULT NULL,
  `facebook` TEXT DEFAULT NULL,
  `instagram` TEXT DEFAULT NULL,
  `linkedin` TEXT DEFAULT NULL,
  `twitter` TEXT DEFAULT NULL,
  `seo_title` TEXT DEFAULT NULL,
  `seo_description` TEXT DEFAULT NULL,
  `seo_keywords` TEXT DEFAULT NULL,
  `seo_og_image` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. quote_requests
CREATE TABLE IF NOT EXISTS `quote_requests` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY,
  `company` VARCHAR(255) NOT NULL DEFAULT '',
  `contact_person` VARCHAR(255) NOT NULL DEFAULT '',
  `email` VARCHAR(255) NOT NULL DEFAULT '',
  `country` VARCHAR(100) NOT NULL DEFAULT '',
  `product` VARCHAR(255) NOT NULL DEFAULT '',
  `quantity` VARCHAR(100) NOT NULL DEFAULT '',
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seeds
INSERT INTO `product_categories` (`id`, `slug`, `name_en`, `name_ar`, `name_zh`, `sort_order`, `active`, `trade`) VALUES
('cat-fruits', 'fresh-fruits', 'Fresh Fruits', 'فواكه طازجة', '新鲜水果', 1, 1, 'export'),
('cat-vegetables', 'fresh-vegetables', 'Fresh Vegetables', 'خضروات طازجة', '新鲜蔬菜', 2, 1, 'export'),
('cat-frozen-fruits', 'frozen-fruits', 'Frozen Fruits', 'فواكه مجمدة', '冷冻水果', 3, 1, 'export'),
('cat-frozen-vegetables', 'frozen-vegetables', 'Frozen Vegetables', 'خضروات مجمدة', '冷冻蔬菜', 4, 1, 'export')
ON DUPLICATE KEY UPDATE `slug`=VALUES(`slug`);

INSERT INTO `site_settings` (`id`, `company_name`, `phone`, `email`, `whatsapp`) VALUES
('default', 'MA GROUP', '+201000000000', 'info@magroupexport.com', '+201000000000')
ON DUPLICATE KEY UPDATE `company_name`=VALUES(`company_name`);

SET FOREIGN_KEY_CHECKS = 1;
