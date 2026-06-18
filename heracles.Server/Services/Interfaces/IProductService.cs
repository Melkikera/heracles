// Services/Interfaces/IProductService.cs
namespace heracles.Server.Services.Interfaces
{
    using heracles.Server.DTOs;
    using System.Threading.Tasks;

    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllAsync();
        Task<ProductDTO?> GetByIdAsync(int id);
        Task<ProductDTO> CreateAsync(ProductCreateDTO dto, int userId);
        Task<ProductDTO?> UpdateAsync(int id, ProductUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<ProductDTO>> GetByCategoryAsync(string category);
        Task<IEnumerable<ProductDTO>> GetActiveAsync();
        Task<PaginatedProductsDTO> GetPaginatedAsync(int pageNumber, int pageSize);
        Task<PaginatedProductsDTO> SearchAsync(string searchTerm, int pageNumber, int pageSize);
    }
}