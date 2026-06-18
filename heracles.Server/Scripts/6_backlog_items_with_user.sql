-- Backlog avec utilisateur
CREATE VIEW backlog_items_with_user AS
SELECT
    b.id, b.uuid, b.title, b.description, b.type, b.status, b.priority,
    b.created_by_id, u.email AS created_by_email,
    b.created_at, b.updated_at, b.deleted_at
FROM backlog_items b
JOIN users u ON u.id = b.created_by_id
WHERE b.deleted_at IS NULL AND u.deleted_at IS NULL;

-- Roadmap avec détails backlog
CREATE VIEW roadmap_items_with_details AS
SELECT
    r.id, r.uuid, r.backlog_item_id,
    b.title AS backlog_title, b.type AS backlog_type, b.status AS backlog_status,
    r.title AS roadmap_title, r.start_date, r.end_date, r.quarter,
    r.description AS roadmap_description,
    r.created_by_id, u.email AS created_by_email,
    r.created_at, r.updated_at, r.deleted_at
FROM roadmap_items r
JOIN backlog_items b ON b.id = r.backlog_item_id
JOIN users u ON u.id = r.created_by_id
WHERE r.deleted_at IS NULL AND b.deleted_at IS NULL AND u.deleted_at IS NULL;

-- Feedbacks avec détails
CREATE VIEW feedbacks_with_details AS
SELECT
    f.id, f.uuid, f.backlog_item_id,
    b.title AS backlog_title, b.type AS backlog_type,
    f.title AS feedback_title, f.description AS feedback_description,
    f.source, f.status,
    f.created_by_id, u.email AS created_by_email,
    f.created_at, f.updated_at, f.deleted_at
FROM feedbacks f
LEFT JOIN backlog_items b ON b.id = f.backlog_item_id
JOIN users u ON u.id = f.created_by_id
WHERE f.deleted_at IS NULL AND u.deleted_at IS NULL;