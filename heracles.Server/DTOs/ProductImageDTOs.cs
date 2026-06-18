namespace heracles.Server.DTOs
{
    using System;

    public class ProductImageCreateDTO
    {
        public string Url { get; set; }
        public string? AltText { get; set; }
        public bool IsPrimary { get; set; }
        public int Order { get; set; }
    }

    public class ProductImageUpdateDTO
    {
        public string Url { get; set; }
        public string? AltText { get; set; }
        public bool IsPrimary { get; set; }
        public int Order { get; set; }
    }

    public class ProductImageDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Url { get; set; }
        public string? AltText { get; set; }
        public bool IsPrimary { get; set; }
        public int Order { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public int CreatedById { get; set; }
        public string? CreatedByEmail { get; set; }
    }
}