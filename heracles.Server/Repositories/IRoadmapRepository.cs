namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRoadmapRepository : IRepository<RoadmapItem>
    {
        Task<IEnumerable<RoadmapItem>> GetByBacklogItemAsync(long backlogItemId);
        Task<IEnumerable<RoadmapItem>> GetByQuarterAsync(string quarter);
        Task<IEnumerable<RoadmapItem>> GetByDateRangeAsync(System.DateTime start, System.DateTime end);
        Task<IEnumerable<RoadmapItem>> GetCreatedByAsync(long userId);
    }
}