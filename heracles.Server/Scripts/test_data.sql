-- =====================================================
-- JEU DE TESTS COMPLET POUR MVP PRODUCT MANAGEMENT
-- Toutes les tables : users, products, product_images, 
-- product_tags, tags, backlog_items, roadmap_items, feedbacks
-- =====================================================

-- =====================================================
-- 1. TABLES : USERS
-- =====================================================
INSERT INTO users (uuid, email, password_hash, role, created_at, updated_at, deleted_at)
VALUES
    (gen_random_uuid(), 'admin@example.com', 'hash_admin_password_123', 'admin', NOW(), NOW(), NULL),
    (gen_random_uuid(), 'user1@example.com', 'hash_user1_password_123', 'member', NOW(), NOW(), NULL),
    (gen_random_uuid(), 'user2@example.com', 'hash_user2_password_123', 'member', NOW(), NOW(), NULL),
    (gen_random_uuid(), 'user3@example.com', 'hash_user3_password_123', 'member', NOW(), NOW(), NULL),
    (gen_random_uuid(), 'manager@example.com', 'hash_manager_password_123', 'admin', NOW(), NOW(), NULL);

-- Rattraper les IDs (supposons 1 à 5)
-- Note: Pour PostgreSQL avec séquence, on peut utiliser NEXTVAL

-- =====================================================
-- 2. TABLE : TAGS (Tags globaux)
-- =====================================================
INSERT INTO tags (name, description, color, created_at, updated_at, deleted_at)
VALUES
    ('New Feature', 'Suggère une nouvelle fonctionnalité', '#4f46e5', NOW(), NOW(), NULL),
    ('Bug Fix', 'Correction de bug', '#ef4444', NOW(), NOW(), NULL),
    ('Performance', 'Amélioration de performance', '#10b981', NOW(), NOW(), NULL),
    ('UI/UX', 'Amélioration interface utilisateur', '#f59e0b', NOW(), NOW(), NULL),
    ('Security', 'Sécurité et confidentialité', '#dc2626', NOW(), NOW(), NULL),
    ('Mobile', 'Optimisation mobile', '#0891b2', NOW(), NOW(), NULL),
    ('API', 'Amélioration API', '#7c3aed', NOW(), NOW(), NULL),
    ('Documentation', 'Documentation et guides', '#059669', NOW(), NOW(), NULL);

-- IDs des tags : 1 à 8

-- =====================================================
-- 3. TABLE : PRODUCTS
-- =====================================================
INSERT INTO products (uuid, name, price, description, category, stock_quantity, is_active, sku, discount_percentage, created_by_id, created_at, updated_at, deleted_at)
VALUES
    -- Produits Actifs (5)
    (gen_random_uuid(), 'Product Analytics Pro', 99.99, 'Analytics dashboard avec métriques avancées', 'Software', 150, true, 'PAP-001', 10.0, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'User Management Suite', 149.99, 'Suite complète pour gérer les utilisateurs', 'Software', 75, true, 'UMS-002', 15.0, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'API Documentation Tool', 49.99, 'Générateur de documentation API automatique', 'Software', 200, true, 'ADT-003', 5.0, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Mobile App Builder', 199.99, 'Constructeur d'applications mobiles sans code', 'Software', 50, true, 'MAB-004', 20.0, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Email Notification Service', 29.99, 'Service d'envoi d'emails automatisé', 'Service', 500, true, 'ENS-005', 0.0, 3, NOW(), NOW(), NULL),
    
    -- Produits Inactifs (2)
    (gen_random_uuid(), 'Legacy CRM System', 299.99, 'Système CRM ancien (déprécié)', 'Software', 0, false, 'LCS-006', 0.0, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Old Reporting Tool', 79.99, 'Outil de reporting ancien', 'Software', 0, false, 'ORT-007', 0.0, 3, NOW(), NOW(), NULL);

-- IDs des produits : 1 à 7

-- =====================================================
-- 4. TABLE : PRODUCT_IMAGES
-- =====================================================
INSERT INTO product_images (product_id, url, alt_text, is_primary, order, created_by_id, created_at, updated_at, deleted_at)
VALUES
    -- Images pour Product 1 (Analytics Pro)
    (1, 'https://cdn.example.com/products/analytics-pro-main.jpg', 'Analytics Pro Dashboard', true, 0, 1, NOW(), NOW(), NULL),
    (1, 'https://cdn.example.com/products/analytics-pro-chart.jpg', 'Analytics Pro Charts', false, 1, 1, NOW(), NOW(), NULL),
    (1, 'https://cdn.example.com/products/analytics-pro-mobile.jpg', 'Analytics Pro Mobile View', false, 2, 2, NOW(), NOW(), NULL),
    
    -- Images pour Product 2 (User Management)
    (2, 'https://cdn.example.com/products/user-mgmt-main.jpg', 'User Management Dashboard', true, 0, 1, NOW(), NOW(), NULL),
    (2, 'https://cdn.example.com/products/user-mgmt-roles.jpg', 'User Management Roles', false, 1, 1, NOW(), NOW(), NULL),
    
    -- Images pour Product 3 (API Docs)
    (3, 'https://cdn.example.com/products/api-docs-main.jpg', 'API Documentation Interface', true, 0, 2, NOW(), NOW(), NULL),
    (3, 'https://cdn.example.com/products/api-docs-swagger.jpg', 'Swagger Integration', false, 1, 2, NOW(), NOW(), NULL),
    
    -- Images pour Product 4 (Mobile Builder)
    (4, 'https://cdn.example.com/products/mobile-builder-main.jpg', 'Mobile App Builder Interface', true, 0, 2, NOW(), NOW(), NULL),
    (4, 'https://cdn.example.com/products/mobile-builder-preview.jpg', 'Mobile App Preview', false, 1, 2, NOW(), NOW(), NULL),
    (4, 'https://cdn.example.com/products/mobile-builder-ios.jpg', 'iOS App Preview', false, 2, 2, NOW(), NOW(), NULL),
    (4, 'https://cdn.example.com/products/mobile-builder-android.jpg', 'Android App Preview', false, 3, 3, NOW(), NOW(), NULL),
    
    -- Images pour Product 5 (Email Service)
    (5, 'https://cdn.example.com/products/email-service-main.jpg', 'Email Notification Dashboard', true, 0, 3, NOW(), NOW(), NULL),
    
    -- Images pour Product 6 (Legacy CRM - Inactif)
    (6, 'https://cdn.example.com/products/legacy-crm-main.jpg', 'Legacy CRM Interface', true, 0, 1, NOW(), NOW(), NULL);

-- IDs des images : 1 à 13

-- =====================================================
-- 5. TABLE : PRODUCT_TAGS
-- =====================================================
INSERT INTO product_tags (product_id, tag_id, tag_name, created_at, updated_at, deleted_at)
VALUES
    -- Tags pour Product 1 (Analytics Pro)
    (1, 1, NULL, NOW(), NOW(), NULL),  -- New Feature
    (1, 3, NULL, NOW(), NOW(), NULL),  -- Performance
    (1, NULL, 'Dashboard', NOW(), NOW(), NULL),  -- Tag local
    
    -- Tags pour Product 2 (User Management)
    (2, 1, NULL, NOW(), NOW(), NULL),  -- New Feature
    (2, 5, NULL, NOW(), NOW(), NULL),  -- Security
    (2, NULL, 'Authentication', NOW(), NOW(), NULL),  -- Tag local
    
    -- Tags pour Product 3 (API Docs)
    (3, 7, NULL, NOW(), NOW(), NULL),  -- API
    (3, 8, NULL, NOW(), NOW(), NULL),  -- Documentation
    (3, NULL, 'Swagger', NOW(), NOW(), NULL),  -- Tag local
    
    -- Tags pour Product 4 (Mobile Builder)
    (4, 6, NULL, NOW(), NOW(), NULL),  -- Mobile
    (4, 4, NULL, NOW(), NOW(), NULL),  -- UI/UX
    (4, NULL, 'No-Code', NOW(), NOW(), NULL),  -- Tag local
    
    -- Tags pour Product 5 (Email Service)
    (5, 1, NULL, NOW(), NOW(), NULL),  -- New Feature
    (5, NULL, 'Notifications', NOW(), NOW(), NULL),  -- Tag local
    
    -- Tags pour Product 6 (Legacy CRM)
    (6, NULL, 'Legacy', NOW(), NOW(), NULL);  -- Tag local

-- IDs des product_tags : 1 à 13

-- =====================================================
-- 6. TABLE : BACKLOG_ITEMS
-- =====================================================
INSERT INTO backlog_items (uuid, title, description, type, status, priority, created_by_id, created_at, updated_at, deleted_at)
VALUES
    -- Features (6)
    (gen_random_uuid(), 'Feature: Dashboard Analytics Enhancement', 'Adding advanced analytics with custom charts and real-time metrics', 'feature', 'idea', 80, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Feature: User Authentication Oauth2', 'Implement OAuth2 authentication with Google, Microsoft, GitHub', 'feature', 'in_progress', 90, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Feature: API Documentation Auto-Gen', 'Auto-generate API documentation from code annotations', 'feature', 'idea', 60, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Feature: Mobile App React Native', 'Build React Native mobile application for iOS and Android', 'feature', 'done', 85, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Feature: Email Templates Builder', 'Custom email templates builder with drag-and-drop', 'feature', 'in_progress', 75, 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Feature: Multi-language Support', 'Add support for 10+ languages in the application', 'feature', 'idea', 50, 3, NOW(), NOW(), NULL),
    
    -- Bugs (4)
    (gen_random_uuid(), 'Bug: Login Page Crash on Empty Email', 'Login page crashes when email field is empty', 'bug', 'in_progress', 95, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Bug: Database Connection Timeout', 'Database connection times out after 30 seconds during peak hours', 'bug', 'idea', 75, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Bug: API 500 Error on POST /products', 'POST requests to /api/products return 500 error', 'bug', 'done', 90, 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Bug: Mobile App Scroll Performance', 'Mobile app has poor scroll performance on long lists', 'bug', 'idea', 65, 1, NOW(), NOW(), NULL),
    
    -- Initiatives (3)
    (gen_random_uuid(), 'Initiative: Microservices Architecture', 'Migrate from monolith to microservices architecture', 'initiative', 'idea', 50, 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Initiative: CI/CD Pipeline Automation', 'Implement automated CI/CD pipeline with GitHub Actions', 'initiative', 'in_progress', 70, 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 'Initiative: Security Audit 2026', 'Conduct security audit and fix all vulnerabilities', 'initiative', 'idea', 65, 3, NOW(), NOW(), NULL);

-- IDs des backlog_items : 1 à 13

-- =====================================================
-- 7. TABLE : ROADMAP_ITEMS
-- =====================================================
INSERT INTO roadmap_items (uuid, backlog_item_id, title, start_date, end_date, quarter, description, created_by_id, created_at, updated_at, deleted_at)
VALUES
    -- Q1 2026 (4 items)
    (gen_random_uuid(), 2, 'OAuth2 Authentication', '2026-01-15', '2026-02-15', 'Q1 2026', 'Implement OAuth2 with Google, Microsoft, GitHub', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 4, 'Mobile App React Native', '2026-01-01', '2026-01-31', 'Q1 2026', 'React Native mobile app for iOS/Android', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 7, 'Bug: Login Page Crash', '2026-01-10', '2026-01-20', 'Q1 2026', 'Fix login page crash on empty email', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 10, 'Bug: API 500 Error', '2026-01-05', '2026-01-15', 'Q1 2026', 'Fix POST /products 500 error', 3, NOW(), NOW(), NULL),
    
    -- Q2 2026 (5 items)
    (gen_random_uuid(), 1, 'Dashboard Analytics Enhancement', '2026-04-01', '2026-06-30', 'Q2 2026', 'Advanced analytics with custom charts', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 3, 'API Documentation Auto-Gen', '2026-04-15', '2026-05-30', 'Q2 2026', 'Auto-generate docs from annotations', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 5, 'Email Templates Builder', '2026-05-01', '2026-06-15', 'Q2 2026', 'Drag-and-drop email templates', 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), 8, 'Bug: Database Timeout', '2026-05-01', '2026-05-15', 'Q2 2026', 'Fix database connection timeout', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 12, 'CI/CD Pipeline Automation', '2026-04-01', '2026-06-15', 'Q2 2026', 'Automated CI/CD with GitHub Actions', 2, NOW(), NOW(), NULL),
    
    -- Q3 2026 (3 items)
    (gen_random_uuid(), 6, 'Multi-language Support', '2026-07-01', '2026-09-30', 'Q3 2026', 'Support for 10+ languages', 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), 9, 'Bug: Mobile Scroll Performance', '2026-07-15', '2026-08-15', 'Q3 2026', 'Fix mobile app scroll performance', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 13, 'Security Audit 2026', '2026-07-15', '2026-09-15', 'Q3 2026', 'Security audit and vulnerability fixes', 3, NOW(), NOW(), NULL),
    
    -- Q4 2026 (2 items)
    (gen_random_uuid(), 11, 'Microservices Architecture', '2026-10-01', '2026-12-31', 'Q4 2026', 'Migrate to microservices', 1, NOW(), NOW(), NULL);

-- IDs des roadmap_items : 1 à 14

-- =====================================================
-- 8. TABLE : FEEDBACKS
-- =====================================================
INSERT INTO feedbacks (uuid, backlog_item_id, title, description, source, status, created_by_id, created_at, updated_at, deleted_at)
VALUES
    -- Feedbacks liés à des Features (6)
    (gen_random_uuid(), 1, 'Need More Analytics Customization', 'Customers want to customize their analytics dashboard with custom charts', 'support', 'linked', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 2, 'OAuth2 Should Support More Providers', 'Would like to add Azure AD and Salesforce OAuth2 providers', 'direct', 'linked', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 3, 'API Docs Very Useful', 'Auto-generated API documentation is very helpful for developers', 'sale', 'linked', 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), 4, 'Mobile App Performance Great', 'React Native mobile app has excellent performance', 'direct', 'linked', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 5, 'Email Templates Builder Request', 'Many customers request drag-and-drop email templates', 'support', 'linked', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 6, 'Multi-language Essential', 'Multi-language support is essential for international customers', 'direct', 'linked', 3, NOW(), NOW(), NULL),
    
    -- Feedbacks liés à des Bugs (3)
    (gen_random_uuid(), 7, 'Login Crash Critical', 'Login page crash is critical, blocking all new users', 'direct', 'linked', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), 8, 'DB Timeout Frequent', 'Database timeout happens frequently during peak hours', 'support', 'linked', 2, NOW(), NOW(), NULL),
    (gen_random_uuid(), 9, 'API 500 Fixed Great', 'API 500 error was fixed, working perfectly now', 'direct', 'linked', 3, NOW(), NOW(), NULL),
    
    -- Feedbacks sans lien (3)
    (gen_random_uuid(), NULL, 'Want Dark Mode Option', 'Would like to have dark mode option for better UX', 'direct', 'new', 3, NOW(), NOW(), NULL),
    (gen_random_uuid(), NULL, 'Export to PDF Feature', 'Need ability to export reports and analytics to PDF format', 'support', 'new', 1, NOW(), NOW(), NULL),
    (gen_random_uuid(), NULL, 'Better Search Functionality', 'Search functionality needs improvement with filters', 'direct', 'new', 2, NOW(), NOW(), NULL),
    
    -- Feedbacks ignorés (1)
    (gen_random_uuid(), 1, 'Too Many Features Confusing', 'Some users think there are too many features, interface is confusing', 'sale', 'ignored', 3, NOW(), NOW(), NULL);

-- IDs des feedbacks : 1 à 13

-- =====================================================
-- 9. VUES POUR VERIFICATION
-- =====================================================

-- Vérifier le nombre d'items par table
SELECT 'users' as table_name, COUNT(*) as count FROM users WHERE deleted_at IS NULL
UNION ALL
SELECT 'tags', COUNT(*) FROM tags WHERE deleted_at IS NULL
UNION ALL
SELECT 'products', COUNT(*) FROM products WHERE deleted_at IS NULL
UNION ALL
SELECT 'product_images', COUNT(*) FROM product_images WHERE deleted_at IS NULL
UNION ALL
SELECT 'product_tags', COUNT(*) FROM product_tags WHERE deleted_at IS NULL
UNION ALL
SELECT 'backlog_items', COUNT(*) FROM backlog_items WHERE deleted_at IS NULL
UNION ALL
SELECT 'roadmap_items', COUNT(*) FROM roadmap_items WHERE deleted_at IS NULL
UNION ALL
SELECT 'feedbacks', COUNT(*) FROM feedbacks WHERE deleted_at IS NULL;

-- Vérifier les produits par catégorie
SELECT category, COUNT(*) as count, SUM(stock_quantity) as total_stock 
FROM products 
WHERE deleted_at IS NULL 
GROUP BY category;

-- Vérifier les produits par statut
SELECT is_active, COUNT(*) as count 
FROM products 
WHERE deleted_at IS NULL 
GROUP BY is_active;

-- Vérifier les backlog items par type
SELECT type, status, COUNT(*) as count 
FROM backlog_items 
WHERE deleted_at IS NULL 
GROUP BY type, status;

-- Vérifier les roadmap items par quarter
SELECT quarter, COUNT(*) as count 
FROM roadmap_items 
WHERE deleted_at IS NULL 
GROUP BY quarter;

-- Vérifier les feedbacks par source
SELECT source, status, COUNT(*) as count 
FROM feedbacks 
WHERE deleted_at IS NULL 
GROUP BY source, status;

-- Voir tous les produits avec leurs images
SELECT 
    p.id,
    p.name,
    p.price,
    p.category,
    p.stock_quantity,
    p.is_active,
    p.sku,
    COUNT(pi.id) as image_count,
    u.email as created_by
FROM products p
LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.deleted_at IS NULL
JOIN users u ON u.id = p.created_by_id
WHERE p.deleted_at IS NULL
GROUP BY p.id, p.name, p.price, p.category, p.stock_quantity, p.is_active, p.sku, u.email;

-- Voir les produits avec leurs tags
SELECT 
    p.id,
    p.name,
    p.category,
    COUNT(pt.id) as tag_count,
    ARRAY_AGG(pt.tag_name) as tag_names
FROM products p
LEFT JOIN product_tags pt ON pt.product_id = p.id AND pt.deleted_at IS NULL
WHERE p.deleted_at IS NULL
GROUP BY p.id, p.name, p.category;

-- Voir roadmap avec backlog items
SELECT 
    r.id,
    r.title as roadmap_title,
    r.quarter,
    r.start_date,
    r.end_date,
    b.title as backlog_title,
    b.type as backlog_type,
    b.status as backlog_status,
    u.email as created_by
FROM roadmap_items r
JOIN backlog_items b ON b.id = r.backlog_item_id
JOIN users u ON u.id = r.created_by_id
WHERE r.deleted_at IS NULL;

-- Voir feedbacks avec backlog items
SELECT 
    f.id,
    f.title as feedback_title,
    f.source,
    f.status,
    b.title as backlog_title,
    b.type as backlog_type,
    u.email as created_by
FROM feedbacks f
LEFT JOIN backlog_items b ON b.id = f.backlog_item_id
JOIN users u ON u.id = f.created_by_id
WHERE f.deleted_at IS NULL;

-- =====================================================
-- 10. STATEMENTS POUR TESTS UNITAIRES
-- =====================================================

-- Test: compter users
SELECT COUNT(*) as user_count FROM users WHERE deleted_at IS NULL;
-- Résultat attendu: 5

-- Test: compter tags
SELECT COUNT(*) as tag_count FROM tags WHERE deleted_at IS NULL;
-- Résultat attendu: 8

-- Test: compter products
SELECT COUNT(*) as product_count FROM products WHERE deleted_at IS NULL;
-- Résultat attendu: 7

-- Test: compter product_images
SELECT COUNT(*) as image_count FROM product_images WHERE deleted_at IS NULL;
-- Résultat attendu: 13

-- Test: compter product_tags
SELECT COUNT(*) as product_tag_count FROM product_tags WHERE deleted_at IS NULL;
-- Résultat attendu: 13

-- Test: compter backlog_items
SELECT COUNT(*) as backlog_count FROM backlog_items WHERE deleted_at IS NULL;
-- Résultat attendu: 13

-- Test: compter roadmap_items
SELECT COUNT(*) as roadmap_count FROM roadmap_items WHERE deleted_at IS NULL;
-- Résultat attendu: 14

-- Test: compter feedbacks
SELECT COUNT(*) as feedback_count FROM feedbacks WHERE deleted_at IS NULL;
-- Résultat attendu: 13

-- Test: produits actifs
SELECT COUNT(*) as active_products FROM products WHERE is_active = true AND deleted_at IS NULL;
-- Résultat attendu: 5

-- Test: produits inactifs
SELECT COUNT(*) as inactive_products FROM products WHERE is_active = false AND deleted_at IS NULL;
-- Résultat attendu: 2

-- Test: features en idea
SELECT COUNT(*) as features_in_idea 
FROM backlog_items 
WHERE type = 'feature' AND status = 'idea' AND deleted_at IS NULL;
-- Résultat attendu: 3

-- Test: bugs en in_progress
SELECT COUNT(*) as bugs_in_progress 
FROM backlog_items 
WHERE type = 'bug' AND status = 'in_progress' AND deleted_at IS NULL;
-- Résultat attendu: 1

-- Test: roadmap Q2 2026
SELECT COUNT(*) as roadmap_q2 
FROM roadmap_items 
WHERE quarter = 'Q2 2026' AND deleted_at IS NULL;
-- Résultat attendu: 5

-- Test: feedbacks linked
SELECT COUNT(*) as feedbacks_linked 
FROM feedbacks 
WHERE status = 'linked' AND deleted_at IS NULL;
-- Résultat attendu: 10

-- Test: feedbacks new
SELECT COUNT(*) as feedbacks_new 
FROM feedbacks 
WHERE status = 'new' AND deleted_at IS NULL;
-- Résultat attendu: 3

-- Test: produits avec tags
SELECT COUNT(*) as products_with_tags
FROM (
    SELECT DISTINCT p.id
    FROM products p
    JOIN product_tags pt ON pt.product_id = p.id AND pt.deleted_at IS NULL
    WHERE p.deleted_at IS NULL
) as subquery;
-- Résultat attendu: 6

-- =====================================================
-- 11. CLEANUP (POUR REPRODUCTION)
-- =====================================================

-- Pour rejouer le script, supprimer les données:

-- DELETE FROM feedbacks WHERE deleted_at IS NULL;
-- DELETE FROM roadmap_items WHERE deleted_at IS NULL;
-- DELETE FROM backlog_items WHERE deleted_at IS NULL;
-- DELETE FROM product_tags WHERE deleted_at IS NULL;
-- DELETE FROM product_images WHERE deleted_at IS NULL;
-- DELETE FROM products WHERE deleted_at IS NULL;
-- DELETE FROM tags WHERE deleted_at IS NULL;
-- DELETE FROM users WHERE email LIKE '%@example.com';