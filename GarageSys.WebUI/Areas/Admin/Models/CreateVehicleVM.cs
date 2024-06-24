namespace GarageSys.WebUI.Areas.Admin.Models
{
    public class CreateVehicleVM
    {
        public int customerId { get; set; }
        public string plateNumber { get; set; } = string.Empty;
    }
}
