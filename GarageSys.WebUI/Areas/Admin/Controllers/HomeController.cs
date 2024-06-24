using GarageSys.Core.Enums;
using GarageSys.Data.UnitWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarageSys.WebUI.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "SuperAdmin,DepartmentManager,Employee")]
    public class HomeController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
         public HomeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _unitOfWork.BookingRepository.GetCurrentBookingListByYearAsync(DateTime.Now.Year);
            return Ok(new { Data = events });
        }
        [HttpPost]
        public async Task<IActionResult> ConfirmBooking(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            else
            {
                var booking = await _unitOfWork.BookingRepository.FindAsync(x=>x.Id == id);
                if (booking == null) return BadRequest();
                booking.BookingState = BookingState.Confirmed;
                _unitOfWork.BookingRepository.Update(booking);
                if ( await _unitOfWork.SaveAsync())
                {
                    //redirect to cutomer page
                    return Ok(booking.Id);
                   //return RedirectToAction("Details", "Booking", new { area = "area",id=booking.Id });
                }
                
                    return BadRequest();
                
            }
        }
    }
}
