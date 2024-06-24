using GarageSys.Data.Repositories.Interfaces;
using GarageSys.Data.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.UnitWork
{
    public interface IUnitOfWork
    {
        public IServiceRepository ServiceRepository { get; }
        public IBookingRepository BookingRepository  { get; }
        public IVehicleRepository VehicleRepository { get; }
        public IVehicleSepcRepository VehicleSepcRepository { get; }
        Task<bool> SaveAsync();
    }
}
