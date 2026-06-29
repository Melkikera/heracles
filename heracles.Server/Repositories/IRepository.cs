namespace heracles.Server.Repositories
{
    using heracles.Server.Entities;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRepository<T> where T : class
    {
        IQueryable<T> Query();
        Task<T?> GetByIdAsync(long id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}