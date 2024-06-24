using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
         Task<T?>  FindAsync(Expression<Func<T, bool>> match, string[]? includes = null);

        Task<bool> IsValidIdAsync(int id);
        Task<bool> IsValidIdsAsync(List<int> selectedIds);

        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetPagedReponseAsync(int page, int size);

        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<T> DeleteAsync(T entity);

        void Update(T entity);
        void Delete(T entity);
    }
}
