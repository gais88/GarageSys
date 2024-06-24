namespace GarageSys.WebUI.Areas.Admin.Models
{
    public class BookingDetailsVM:BookingVM
    {
        public List<ServiceVM> Services { get; set; }
        public List<VehicleVM> Vehicles { get; set; }
    }
}
