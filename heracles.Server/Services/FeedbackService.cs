namespace heracles.Server.Services
{
    using heracles.Server.Services.Interfaces;
    using heracles.Server.Entities;
    using heracles.Server.Repositories;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class FeedbackService : IFeedbackService
    {
        private readonly IUnitOfWork _unitOfWork;

        public FeedbackService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Feedback?> GetByIdAsync(long id)
        {
            return await _unitOfWork.Feedbacks.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Feedback>> GetAllAsync()
        {
            return await _unitOfWork.Feedbacks.GetAllAsync();
        }

        public async Task<Feedback> CreateAsync(Feedback item, int userId)
        {
            item.CreatedById = userId;
            item.CreatedBy = await _unitOfWork.Users.GetByIdAsync(userId);
            item.CreatedAt = System.DateTime.UtcNow;
            item.UpdatedAt = System.DateTime.UtcNow;

            await _unitOfWork.Feedbacks.AddAsync(item);
            await _unitOfWork.CommitAsync();

            return item;
        }

        public async Task<Feedback?> UpdateAsync(long id, Feedback item)
        {
            var existing = await _unitOfWork.Feedbacks.GetByIdAsync(id);
            if (existing == null)
                return null;

            existing.BacklogItemId = item.BacklogItemId;
            existing.Title = item.Title;
            existing.Description = item.Description;
            existing.Source = item.Source;
            existing.Status = item.Status;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.Feedbacks.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return existing;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _unitOfWork.Feedbacks.GetByIdAsync(id);
            if (existing == null)
                return false;

            // Soft delete
            existing.DeletedAt = System.DateTime.UtcNow;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.Feedbacks.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<IEnumerable<Feedback>> GetByBacklogItemAsync(long backlogItemId)
        {
            return await _unitOfWork.Feedbacks.GetByBacklogItemAsync(backlogItemId);
        }

        public async Task<IEnumerable<Feedback>> GetBySourceAsync(string source)
        {
            return await _unitOfWork.Feedbacks.GetBySourceAsync(source);
        }

        public async Task<IEnumerable<Feedback>> GetByStatusAsync(string status)
        {
            return await _unitOfWork.Feedbacks.GetByStatusAsync(status);
        }
    }
}