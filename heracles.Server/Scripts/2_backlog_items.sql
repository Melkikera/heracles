CREATE TABLE backlog_items (
    id              BIGSERIAL PRIMARY KEY,
    uuid            UUID NOT NULL DEFAULT gen_random_uuid(),
    title           VARCHAR(255) NOT NULL,
    description     TEXT NULL,
    type            VARCHAR(50) NOT NULL DEFAULT 'feature',  -- 'feature', 'bug', 'initiative'
    status          VARCHAR(50) NOT NULL DEFAULT 'idea',     -- 'idea', 'in_progress', 'done'
    priority        INTEGER NOT NULL DEFAULT 0,              -- 0 à 100
    created_by_id   BIGINT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ NULL,

    CONSTRAINT fk_backlog_created_by
        FOREIGN KEY (created_by_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);

CREATE INDEX backlog_items_title_idx ON backlog_items(title);
CREATE INDEX backlog_items_type_idx ON backlog_items(type);
CREATE INDEX backlog_items_status_idx ON backlog_items(status);
CREATE INDEX backlog_items_priority_idx ON backlog_items(priority);
CREATE INDEX backlog_items_created_by_id_idx ON backlog_items(created_by_id);