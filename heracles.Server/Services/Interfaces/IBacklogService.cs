// Services/Interfaces/IBacklogService.cs
namespace heracles.Server.Services.Interfaces
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBacklogService
    {
        Task<BacklogItem?> GetByIdAsync(long id);
        Task<IEnumerable<BacklogItem>> GetAllAsync();
        Task<BacklogItem> CreateAsync(BacklogItem item, int userId);
        Task<BacklogItem?> UpdateAsync(long id, BacklogItem item);
        Task<bool> DeleteAsync(long id);

        // Queries spécifiques
        Task<IEnumerable<BacklogItem>> GetByTypeAsync(string type);
        Task<IEnumerable<BacklogItem>> GetByStatusAsync(string status);
        Task<IEnumerable<BacklogItem>> GetByPriorityRangeAsync(int min, int max);
    }
}