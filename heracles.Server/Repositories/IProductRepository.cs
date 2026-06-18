namespace heracles.Server.Interfaces
{
    using heracles.Server.Data;
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync(bool includeDeleted = false);
        Task<Product?> GetByIdAsync(int id);
        Task<Product> CreateAsync(Product product);
        Task<Product?> UpdateAsync(Product product);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<Product>> GetByCategoryAsync(string category);
        Task<IEnumerable<Product>> GetActiveAsync();
        Task<Product?> GetBySkuAsync(string sku);
        Task<PaginatedList<Product>> GetPaginatedAsync(int pageNumber = 1, int pageSize = 10);
        Task<PaginatedList<Product>> SearchAsync(string searchTerm, int pageNumber = 1, int pageSize = 10);

        // NEW
        Task<IEnumerable<ProductImage>> GetImagesAsync(int productId);
        Task<ProductImage?> GetImageAsync(int productId, int imageId);
        Task<ProductImage> AddImageAsync(int productId, ProductImage image);
        Task<bool> RemoveImageAsync(int productId, int imageId);
        Task<IEnumerable<ProductTag>> GetTagsAsync(int productId);
        Task<bool> AddTagAsync(int productId, int tagId);
        Task<bool> RemoveTagAsync(int productId, int tagId);
        Task<bool> AddTagAsync(string tag, int tagId);

    }
}