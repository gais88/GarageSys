using AutoMapper;
using GarageSys.Core.Models;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.Areas.Admin.Models;
using GarageSys.WebUI.CustomeResolver;

namespace GarageSys.WebUI.Profiles
{
    public class AppProfle:Profile
    {
        
        public AppProfle()

        {
           
            CreateMap<Booking, BookingVM>()
                .ForMember(viewModel => viewModel.Customer, model => model.MapFrom(x => x.Customer))
                .ReverseMap();
            CreateMap<Booking, BookingDetailsVM>()
                .ForMember(viewModel => viewModel.Customer, model => model.MapFrom(x => x.Customer))
                .ForMember(viewModel => viewModel.Vehicles, model => model.MapFrom(x => x.Customer.Vehicles))
                .ForMember(viewModel => viewModel.Services, model => model.MapFrom<BookingServiceResolver>())
                .ReverseMap();

            CreateMap<Service, ServiceVM>().ReverseMap();
            CreateMap<Vehicle, VehicleVM>().ReverseMap();
            CreateMap<VehicleSpec, VehicleSpecVM>().ReverseMap();
          
        }
    }
}
