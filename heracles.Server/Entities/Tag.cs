namespace heracles.Server.Entities
{
    using System;
    using System.Collections.Generic;

    public class Tag
    {
        // Primary Key
        public int Id { get; set; }

        // Tag fields
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }

        // Navigation
        public ICollection<ProductTag>? ProductTags { get; set; }

        // Audit & Timestamps
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}