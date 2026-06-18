namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using heracles.Server.Repositories;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IBacklogRepository : IRepository<BacklogItem>
    {
        Task<IEnumerable<BacklogItem>> GetByTypeAsync(string type);
        Task<IEnumerable<BacklogItem>> GetByStatusAsync(string status);
        Task<IEnumerable<BacklogItem>> GetByPriorityRangeAsync(int min, int max);
        Task<IEnumerable<BacklogItem>> GetCreatedByAsync(long userId);
    }
}