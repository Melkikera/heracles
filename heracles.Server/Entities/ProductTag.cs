namespace heracles.Server.Entities
{
    using System;

    public class ProductTag
    {
        // Primary Key
        public int Id { get; set; }

        // Product reference
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        // Tag reference (si tag global)
        public int? TagId { get; set; }
        public Tag? Tag { get; set; }

        // Tag name (si pas de tag global)
        public string TagName { get; set; }

        // Audit & Timestamps
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}