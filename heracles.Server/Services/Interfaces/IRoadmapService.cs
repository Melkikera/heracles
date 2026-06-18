namespace heracles.Server.Services.Interfaces
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRoadmapService
    {
        Task<RoadmapItem?> GetByIdAsync(long id);
        Task<IEnumerable<RoadmapItem>> GetAllAsync();
        Task<RoadmapItem> CreateAsync(RoadmapItem item, int userId);
        Task<RoadmapItem?> UpdateAsync(long id, RoadmapItem item);
        Task<bool> DeleteAsync(long id);

        // Queries spécifiques
        Task<IEnumerable<RoadmapItem>> GetByBacklogItemAsync(long backlogItemId);
        Task<IEnumerable<RoadmapItem>> GetByQuarterAsync(string quarter);
        Task<IEnumerable<RoadmapItem>> GetByDateRangeAsync(System.DateTime start, System.DateTime end);
    }
}