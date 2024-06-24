using GarageSys.Core.Models;
using GarageSys.Data.Context;
using GarageSys.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.Repositories.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : AuditableEntity
    {
        private readonly AppDbContext _dbContext;
        public GenericRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual async Task<T?> GetByIdAsync(int id)
        {
            T? t = await _dbContext.Set<T>().FindAsync(id);
            return t;
        }
        public virtual async Task<T?> FindAsync(Expression<Func<T, bool>> match, string[]? includes = null)
        {
            IQueryable<T> query = _dbContext.Set<T>();
            if (includes != null)
            {
                foreach (var include in includes)
                {
                    query.Include(include);
                }
            }
            T? t = await query.SingleOrDefaultAsync(match);

            return t;
        }

        public async Task<bool> IsValidIdAsync(int id)
        {
            return await _dbContext.Set<T>().AnyAsync(x => x.Id == id);
        }
        public async Task<bool> IsValidIdsAsync(List<int> selectedIds)
        {
            if (selectedIds != null || selectedIds?.Count > 0)
            {
                foreach (var id in selectedIds)
                {
                    if (!await _dbContext.Set<T>().AnyAsync(x => x.Id == id))
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().AsNoTracking()
                                            .ToListAsync();
        }
        public async Task<IEnumerable<T>> GetPagedReponseAsync(int page, int size)
        {
            return await _dbContext.Set<T>().Skip((page - 1) * size)
                                            .Take(size)
                                            .AsNoTracking()
                                            .ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);

            return entity;
        }
        public async Task<T> UpdateAsync(T entity)
        {
            T? result = await _dbContext.Set<T>().FindAsync(entity.Id);
            if (result != null)
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
            }

            return entity;
        }
        public async Task<T> DeleteAsync(T entity)
        {
            T? result = await _dbContext.Set<T>().FindAsync(entity.Id);
            if (result != null)
            {
                _dbContext.Set<T>().Remove(entity);
            }

            return entity;
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }
    }
}
