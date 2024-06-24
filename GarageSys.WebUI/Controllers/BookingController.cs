using GarageSys.Core.Models;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;
using System.Globalization;
using System.Security.Claims;
using System.Text;

namespace GarageSys.WebUI.Controllers
{
    [Authorize]
    public class BookingController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public BookingController(IUnitOfWork unitOfWork,IHttpContextAccessor httpContext)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContext;
        }
        public async Task<IActionResult> Index()
        {
            
            return View(await PopulateForm());
        }
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> Index(BookingVM model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.error = true;
                return View(await PopulateForm());
            }
            ViewBag.error = false;
            var booking = new Booking
            {
                BookingDate = DateTime.ParseExact(model.BookingDate, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture),
                CustomerId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)),
                Desc = model.Desc,
                ServiceIds = string.Join(",", model.ServiceIds),
                CreatedBy = "FrontEnd",
                CreatedDate = DateTime.Now,
            };
            await _unitOfWork.BookingRepository.AddAsync(booking);
            if (await _unitOfWork.SaveAsync())
            {
                //add message to confirm booking and to send email addresz
                TempData["SuccessBooking"] = booking.BookingDate.ToString("dd-MMM-yyyy HH:mm");
                return RedirectToAction("SuccessBooking");
            }
            else
            {
                //add message to confirm booking swwet alert 
                return View(await PopulateForm());
            }
        }
        public IActionResult SuccessBooking()
        {
           
            return View();
        }

        #region Helper Method
        private async Task<List<SelectListItem>> PopulateServices()
        {
            var serives = await _unitOfWork.ServiceRepository.GetAllAsync();
            var serivesList = serives.Select(x=> new SelectListItem { Text=x.Title,Value=x.Id.ToString()}).ToList();
            return serivesList;
        }
        private async Task<BookingVM> PopulateForm()
        {
            BookingVM model = new BookingVM();
            var CurrentBooking = await _unitOfWork.BookingRepository.GetCurrentBookingListByYearAsync(DateTime.Now.Year);
            var disable = CurrentBooking.Select(x => x.BookingDate.ToString("MM/dd/yyyy:HH", CultureInfo.InvariantCulture)).ToArray();
            model.servicesList = await PopulateServices();
            model.EnableHours = disable;
            return model;
        }
        #endregion
    }
}
