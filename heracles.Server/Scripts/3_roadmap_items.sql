CREATE TABLE roadmap_items (
    id              BIGSERIAL PRIMARY KEY,
    uuid            UUID NOT NULL DEFAULT gen_random_uuid(),
    backlog_item_id BIGINT NOT NULL,
    title           VARCHAR(255) NOT NULL,
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    quarter         VARCHAR(20) NULL,           -- ex: 'Q1 2026'
    description     TEXT NULL,
    created_by_id   BIGINT NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ NULL,

    CONSTRAINT fk_roadmap_backlog_item
        FOREIGN KEY (backlog_item_id)
        REFERENCES backlog_items(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_roadmap_created_by
        FOREIGN KEY (created_by_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT chk_roadmap_dates
        CHECK (end_date >= start_date)
);

CREATE INDEX roadmap_items_backlog_item_id_idx ON roadmap_items(backlog_item_id);
CREATE INDEX roadmap_items_start_date_idx ON roadmap_items(start_date);
CREATE INDEX roadmap_items_end_date_idx ON roadmap_items(end_date);
CREATE INDEX roadmap_items_quarter_idx ON roadmap_items(quarter);