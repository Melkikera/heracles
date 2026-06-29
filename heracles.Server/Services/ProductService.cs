// Services/ProductService.cs
namespace heracles.Server.Services
{
    using heracles.Server.Data;
    using heracles.Server.DTOs;
    using heracles.Server.Entities;
    using heracles.Server.Interfaces;
    using heracles.Server.Services.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly AppDbContext _context;

        public ProductService(IProductRepository productRepository, AppDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
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

        public async Task<PaginatedProductsDTO> GetPaginatedAsync(
       string? search,
       string? category,
       bool? isActive,
       int page,
       int pageSize)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.Name.Contains(search) ||
                    (p.Description != null && p.Description.Contains(search)));
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(p => p.Category != null && p.Category.Contains(category));
            }

            if (isActive.HasValue)
            {
                query = query.Where(p => p.IsActive == isActive.Value);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedProductsDTO
            {
                Items = items.Select(ToDTO),
                TotalCount = totalCount,
                PageNumber = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

        public async Task<PaginatedProductsDTO> SearchAsync(
            string term,
            bool? isActive,
            int page,
            int pageSize)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(term))
            {
                query = query.Where(p =>
                    p.Name.Contains(term) ||
                    (p.Description != null && p.Description.Contains(term)));
            }

            if (isActive.HasValue)
            {
                query = query.Where(p => p.IsActive == isActive.Value);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedProductsDTO
            {
                Items = items.Select(ToDTO),
                TotalCount = totalCount,
                PageNumber = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
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