// Services/BacklogService.cs
namespace heracles.Server.Services
{
    using heracles.Server.Entities;
    using heracles.Server.Repositories;
    using heracles.Server.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class BacklogService : IBacklogService
    {
        private readonly IUnitOfWork _unitOfWork;

        public BacklogService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BacklogItem?> GetByIdAsync(long id)
        {
            return await _unitOfWork.BacklogItems.GetByIdAsync(id);
        }

        public async Task<IEnumerable<BacklogItem>> GetAllAsync()
        {
            return await _unitOfWork.BacklogItems.GetAllAsync();
        }

        public async Task<BacklogItem> CreateAsync(BacklogItem item, int userId)
        {
            item.CreatedById = userId;
            item.CreatedBy = await _unitOfWork.Users.GetByIdAsync(userId);
            item.CreatedAt = System.DateTime.UtcNow;
            item.UpdatedAt = System.DateTime.UtcNow;

            await _unitOfWork.BacklogItems.AddAsync(item);
            await _unitOfWork.CommitAsync();

            return item;
        }

        public async Task<BacklogItem?> UpdateAsync(long id, BacklogItem item)
        {
            var existing = await _unitOfWork.BacklogItems.GetByIdAsync(id);
            if (existing == null)
                return null;

            existing.Title = item.Title;
            existing.Description = item.Description;
            existing.Type = item.Type;
            existing.Status = item.Status;
            existing.Priority = item.Priority;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.BacklogItems.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return existing;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _unitOfWork.BacklogItems.GetByIdAsync(id);
            if (existing == null)
                return false;

            // Soft delete
            existing.DeletedAt = System.DateTime.UtcNow;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.BacklogItems.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return true;
        }

        // Queries spécifiques
        public async Task<IEnumerable<BacklogItem>> GetByTypeAsync(string type)
        {
            return await _unitOfWork.BacklogItems.GetByTypeAsync(type);
        }

        public async Task<IEnumerable<BacklogItem>> GetByStatusAsync(string status)
        {
            return await _unitOfWork.BacklogItems.GetByStatusAsync(status);
        }

        public async Task<IEnumerable<BacklogItem>> GetByPriorityRangeAsync(int min, int max)
        {
            return await _unitOfWork.BacklogItems.GetByPriorityRangeAsync(min, max);
        }
    }
}