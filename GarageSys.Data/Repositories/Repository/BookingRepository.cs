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
    public class BookingRepository : GenericRepository<Booking>, IBookingRepository
    {
        private readonly AppDbContext _dbContext;
        public BookingRepository(AppDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Booking>> GetAllBookingAsync()
        {
           return  await _dbContext.Bookings.Include(x=>x.Customer).ToListAsync();
        }
        public async Task<Booking> GetBookingByIdAsync(int id)
        {
            return await _dbContext.Bookings.
                                            Include(x => x.Customer)
                                            .ThenInclude(x => x.Vehicles)
                                            .FirstOrDefaultAsync(x=>x.Id ==id);
        }

        public async Task<List<Booking>> GetCurrentBookingListByYearAsync(int year)
        {
            var result = await _dbContext.Bookings.Where(x=>x.BookingDate.Year== year)
                                                  .Include(x=>x.Customer)
                                                  .ToListAsync();
            return result;
        }
        public override Task<Booking?> FindAsync(Expression<Func<Booking, bool>> match, string[]? includes = null)
        {
            return base.FindAsync(match, includes);
        }
    }
}
