using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GarageSys.WebUI.Areas.Admin.Models
{
    public class VehicleSpecVM
    {
        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
}
