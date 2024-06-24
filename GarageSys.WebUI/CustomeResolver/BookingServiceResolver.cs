using AutoMapper;
using GarageSys.Core.Models;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.Areas.Admin.Models;
using GarageSys.WebUI.ViewModels;

namespace GarageSys.WebUI.CustomeResolver
{
    public class BookingServiceResolver : IValueResolver<Booking, BookingDetailsVM, List<ServiceVM>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BookingServiceResolver(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public  List<ServiceVM> Resolve(Booking source, BookingDetailsVM destination, List<ServiceVM> destMember, ResolutionContext context)
        {
            var sericesIds = source.ServiceIds;
            var services =  _unitOfWork.ServiceRepository.GetAllAsync().Result;
            List<Service> services1 = new List<Service>();
            foreach (var id in sericesIds.Split(",")) {
                var s = services.FirstOrDefault(x => x.Id == int.Parse(id));
                if (s != null)
                {
                    services1.Add(s);
                }
            }
            services = services1;
            return _mapper.Map<List<ServiceVM>>(services);
        }
    }
}
