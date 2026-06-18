namespace heracles.Server.DTOs
{
    using System;
    using System.Collections.Generic;

    // ProductCreateDTO (déjà existant, update)
    public class ProductCreateDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int StockQuantity { get; set; } = 0;
        public string? Sku { get; set; }
        public decimal? DiscountPercentage { get; set; }

        // NEW
        public IEnumerable<ProductImageCreateDTO>? Images { get; set; }
        public IEnumerable<string>? Tags { get; set; }
    }

    // ProductUpdateDTO (déjà existant, update)
    public class ProductUpdateDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int StockQuantity { get; set; }
        public string? Sku { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public bool IsActive { get; set; }
    }

    // ProductDTO (déjà existant, update)
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int StockQuantity { get; set; }
        public bool IsActive { get; set; }
        public string? Sku { get; set; }
        public decimal? DiscountPercentage { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public int CreatedById { get; set; }
        public string? CreatedByEmail { get; set; }

        // NEW
        public IEnumerable<ProductImageDTO>? Images { get; set; }
        public IEnumerable<ProductTagDTO>? Tags { get; set; }
    }

    // PaginatedProductsDTO (déjà existant)
    public class PaginatedProductsDTO
    {
        public IEnumerable<ProductDTO> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < TotalPages;
    }
}