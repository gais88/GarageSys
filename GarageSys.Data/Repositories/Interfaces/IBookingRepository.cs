using GarageSys.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.Repositories.Interfaces
{
    public interface IBookingRepository : IGenericRepository<Booking>
    {
        public Task<List<Booking>> GetCurrentBookingListByYearAsync(int year);
        public Task<List<Booking>> GetAllBookingAsync();
        public Task<Booking> GetBookingByIdAsync(int id);
    }
}
