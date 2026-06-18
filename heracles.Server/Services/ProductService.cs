// Services/ProductService.cs
namespace heracles.Server.Services
{
    using heracles.Server.Entities;
    using heracles.Server.Interfaces;
    using heracles.Server.DTOs;
    using heracles.Server.Services.Interfaces;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductDTO>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(ToDTO);
        }

        public async Task<ProductDTO?> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            return product != null ? ToDTO(product) : null;
        }

        public async Task<ProductDTO> CreateAsync(ProductCreateDTO dto, int userId)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description,
                Category = dto.Category,
                StockQuantity = dto.StockQuantity,
                Sku = dto.Sku,
                DiscountPercentage = dto.DiscountPercentage,
                CreatedById = userId
            };

            var created = await _productRepository.CreateAsync(product);
            return ToDTO(created);
        }

        public async Task<ProductDTO?> UpdateAsync(int id, ProductUpdateDTO dto)
        {
            var product = new Product
            {
                Id = id,
                Name = dto.Name,
                Price = dto.Price,
                Description = dto.Description,
                Category = dto.Category,
                StockQuantity = dto.StockQuantity,
                Sku = dto.Sku,
                DiscountPercentage = dto.DiscountPercentage,
                IsActive = dto.IsActive
            };

            var updated = await _productRepository.UpdateAsync(product);
            return updated != null ? ToDTO(updated) : null;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _productRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ProductDTO>> GetByCategoryAsync(string category)
        {
            var products = await _productRepository.GetByCategoryAsync(category);
            return products.Select(ToDTO);
        }

        public async Task<IEnumerable<ProductDTO>> GetActiveAsync()
        {
            var products = await _productRepository.GetActiveAsync();
            return products.Select(ToDTO);
        }

        public async Task<PaginatedProductsDTO> GetPaginatedAsync(int pageNumber, int pageSize)
        {
            var paginated = await _productRepository.GetPaginatedAsync(pageNumber, pageSize);

            return new PaginatedProductsDTO
            {
                Items = paginated.Items.Select(ToDTO),
                TotalCount = paginated.TotalCount,
                PageNumber = paginated.PageNumber,
                PageSize = paginated.PageSize,
                TotalPages = paginated.TotalPages
            };
        }

        public async Task<PaginatedProductsDTO> SearchAsync(string searchTerm, int pageNumber, int pageSize)
        {
            var paginated = await _productRepository.SearchAsync(searchTerm, pageNumber, pageSize);

            return new PaginatedProductsDTO
            {
                Items = paginated.Items.Select(ToDTO),
                TotalCount = paginated.TotalCount,
                PageNumber = paginated.PageNumber,
                PageSize = paginated.PageSize,
                TotalPages = paginated.TotalPages
            };
        }

        private static ProductDTO ToDTO(Product product)
        {
            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                Category = product.Category,
                StockQuantity = product.StockQuantity,
                IsActive = product.IsActive,
                Sku = product.Sku,
                DiscountPercentage = product.DiscountPercentage,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt,
                CreatedById = (int)product.CreatedById,
                CreatedByEmail = product.CreatedBy?.Email
            };
        }
    }
}