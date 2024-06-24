using GarageSys.Core.Models;
using GarageSys.Data.UnitWork;
using GarageSys.WebUI.Areas.Admin.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarageSys.WebUI.Areas.Admin.Controllers
{
        [Area("Admin")]
    public class VehicleController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;

        public VehicleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize(Roles = "SuperAdmin,DepartmentManager,Employee")]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SaveVehicle(string plateNumber,int customerId)
        {
            if (customerId != 0 && !string.IsNullOrEmpty(plateNumber))
            {
                var vehicle = new Vehicle
                {
                    PlateNumber = plateNumber,
                    CustomerId = customerId,
                    CreatedBy = "Admin",
                    CreatedDate = DateTime.Now,
                };
                var isExsits =  _unitOfWork.VehicleRepository.GetAllAsync().Result.Any(x=>x.PlateNumber == plateNumber);
                if (!isExsits)
                {
                await _unitOfWork.VehicleRepository.AddAsync(vehicle);
                if (await _unitOfWork.SaveAsync())
                {
                    return Ok(vehicle);
                }
                    return BadRequest();
                }
            }
            return BadRequest();
        }
    }
}
