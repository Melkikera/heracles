namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IFeedbackRepository : IRepository<Feedback>
    {
        Task<IEnumerable<Feedback>> GetByBacklogItemAsync(long backlogItemId);
        Task<IEnumerable<Feedback>> GetBySourceAsync(string source);
        Task<IEnumerable<Feedback>> GetByStatusAsync(string status);
        Task<IEnumerable<Feedback>> GetCreatedByAsync(long userId);
    }
}