using GarageSys.Core.Models;

namespace GarageSys.WebUI.Areas.Admin.Models
{
    public class VehicleVM
    {
        public int Id { get; set; }
        public string PlateNumber { get; set; } = string.Empty;
        public List<VehicleSpecVM>? VehicleSpecs { get; set; }
    }
}
