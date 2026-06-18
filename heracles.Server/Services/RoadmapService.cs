namespace heracles.Server.Services
{
    using heracles.Server.Entities;
    using heracles.Server.Repositories;
    using heracles.Server.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class RoadmapService : IRoadmapService
    {
        private readonly IUnitOfWork _unitOfWork;

        public RoadmapService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<RoadmapItem?> GetByIdAsync(long id)
        {
            return await _unitOfWork.RoadmapItems.GetByIdAsync(id);
        }

        public async Task<IEnumerable<RoadmapItem>> GetAllAsync()
        {
            return await _unitOfWork.RoadmapItems.GetAllAsync();
        }

        public async Task<RoadmapItem> CreateAsync(RoadmapItem item, int userId)
        {
            item.CreatedById = userId;
            item.CreatedBy=await _unitOfWork.Users.GetByIdAsync(userId);
            item.BacklogItem = await _unitOfWork.BacklogItems.GetByIdAsync(item.BacklogItemId);
            item.BacklogItem.CreatedBy = await _unitOfWork.Users.GetByIdAsync(item.BacklogItem.CreatedById);
            item.StartDate=item.StartDate.ToUniversalTime();
            item.EndDate=item.EndDate.ToUniversalTime();
            item.CreatedAt = System.DateTime.UtcNow;
            item.UpdatedAt = System.DateTime.UtcNow;

            await _unitOfWork.RoadmapItems.AddAsync(item);
            await _unitOfWork.CommitAsync();

            return item;
        }

        public async Task<RoadmapItem?> UpdateAsync(long id, RoadmapItem item)
        {
            var existing = await _unitOfWork.RoadmapItems.GetByIdAsync(id);
            if (existing == null)
                return null;

            existing.BacklogItemId = item.BacklogItemId;
            existing.Title = item.Title;
            existing.StartDate = item.StartDate;
            existing.EndDate = item.EndDate;
            existing.Quarter = item.Quarter;
            existing.Description = item.Description;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.RoadmapItems.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return existing;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var existing = await _unitOfWork.RoadmapItems.GetByIdAsync(id);
            if (existing == null)
                return false;

            // Soft delete
            existing.DeletedAt = System.DateTime.UtcNow;
            existing.UpdatedAt = System.DateTime.UtcNow;

            _unitOfWork.RoadmapItems.UpdateAsync(existing);
            await _unitOfWork.CommitAsync();

            return true;
        }

        public async Task<IEnumerable<RoadmapItem>> GetByBacklogItemAsync(long backlogItemId)
        {
            return await _unitOfWork.RoadmapItems.GetByBacklogItemAsync(backlogItemId);
        }

        public async Task<IEnumerable<RoadmapItem>> GetByQuarterAsync(string quarter)
        {
            return await _unitOfWork.RoadmapItems.GetByQuarterAsync(quarter);
        }

        public async Task<IEnumerable<RoadmapItem>> GetByDateRangeAsync(System.DateTime start, System.DateTime end)
        {
            return await _unitOfWork.RoadmapItems.GetByDateRangeAsync(start, end);
        }
    }
}