CREATE TABLE feedbacks (
    id              BIGSERIAL PRIMARY KEY,
    uuid            UUID NOT NULL DEFAULT gen_random_uuid(),
    backlog_item_id BIGINT NULL,                -- NULL si pas encore lié
    title           VARCHAR(255) NOT NULL,
    description     TEXT NOT NULL,
    source          VARCHAR(50) NOT NULL DEFAULT 'direct',  -- 'direct', 'support', 'sale', 'other'
    status          VARCHAR(50) NOT NULL DEFAULT 'new',     -- 'new', 'linked', 'ignored'
    created_by_id   BIGINT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ NULL,

    CONSTRAINT fk_feedback_backlog_item
        FOREIGN KEY (backlog_item_id)
        REFERENCES backlog_items(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_feedback_created_by
        FOREIGN KEY (created_by_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);

CREATE INDEX feedbacks_title_idx ON feedbacks(title);
CREATE INDEX feedbacks_source_idx ON feedbacks(source);
CREATE INDEX feedbacks_status_idx ON feedbacks(status);
CREATE INDEX feedbacks_backlog_item_id_idx ON feedbacks(backlog_item_id);