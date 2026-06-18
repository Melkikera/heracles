namespace heracles.Server.Entities
{
    using System;

    public class Product
    {
        // Primary Key
        public int Id { get; set; }
        public Guid Uuid { get; set; } = Guid.NewGuid();
        // Champs de base
        public string Name { get; set; }
        public decimal Price { get; set; }

        // Champs supplémentaires
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int StockQuantity { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public string? Sku { get; set; }
        public decimal? DiscountPercentage { get; set; }

        // ✅ CORRECTION : Changed from int to long
        public int CreatedById { get; set; }
        public User? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        // NAVIGATION (NEW)
        public ICollection<ProductImage>? Images { get; set; }
        public ICollection<ProductTag>? Tags { get; set; }
    }
}