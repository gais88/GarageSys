using GarageSys.Data.Context;
using GarageSys.Data.Repositories.Interfaces;
using GarageSys.Data.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.UnitWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _dbContext;

        public UnitOfWork(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IServiceRepository ServiceRepository => new ServiceRepository(_dbContext);

        public IBookingRepository BookingRepository =>  new BookingRepository(_dbContext);

        public IVehicleRepository VehicleRepository => new VehicleRepository(_dbContext);

        public IVehicleSepcRepository VehicleSepcRepository => new VehicleSepcRepository(_dbContext);

        public async Task<bool> SaveAsync()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
