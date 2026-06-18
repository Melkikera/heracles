namespace heracles.Server.Services.Interfaces
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IFeedbackService
    {
        Task<Feedback?> GetByIdAsync(long id);
        Task<IEnumerable<Feedback>> GetAllAsync();
        Task<Feedback> CreateAsync(Feedback item, int userId);
        Task<Feedback?> UpdateAsync(long id, Feedback item);
        Task<bool> DeleteAsync(long id);

        // Queries spécifiques
        Task<IEnumerable<Feedback>> GetByBacklogItemAsync(long backlogItemId);
        Task<IEnumerable<Feedback>> GetBySourceAsync(string source);
        Task<IEnumerable<Feedback>> GetByStatusAsync(string status);
    }
}