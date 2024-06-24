using AutoMapper;
using GarageSys.Core.Models;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.Areas.Admin.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GarageSys.WebUI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "SuperAdmin,DepartmentManager,Employee")]
    public class BookingController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BookingController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            var booking =  _unitOfWork.BookingRepository.GetAllBookingAsync().Result.Where(x=>x.BookingState == Core.Enums.BookingState.Confirmed).ToList();
            var model = _mapper.Map<List<BookingVM>>(booking);  
            return View(model);
        }
        [HttpGet]
        public async Task<IActionResult> Details(int id)
        {
            var booking = await _unitOfWork.BookingRepository.GetBookingByIdAsync(id);
            if (booking == null)
            {
                return NotFound();
            }
            //var sericesIds = booking.ServiceIds;
            //var services = await _unitOfWork.ServiceRepository.GetAllAsync();
            //services = services.Where(x => x.Id.ToString().Contains(sericesIds)).ToList();
            var model = _mapper.Map<BookingDetailsVM>(booking);
            return View(model);

        }
    }
}
