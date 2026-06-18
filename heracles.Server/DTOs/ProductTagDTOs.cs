namespace heracles.Server.DTOs
{
    using System;

    public class ProductTagDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int? TagId { get; set; }
        public string TagName { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}