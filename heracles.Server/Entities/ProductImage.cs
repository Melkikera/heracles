namespace heracles.Server.Entities
{
    using System;

    public class ProductImage
    {
        // Primary Key
        public int Id { get; set; }

        // Product reference
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        // Image fields
        public string Url { get; set; }
        public string? AltText { get; set; }
        public bool IsPrimary { get; set; } = false;
        public int Order { get; set; } = 0;

        // Audit & Timestamps
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}