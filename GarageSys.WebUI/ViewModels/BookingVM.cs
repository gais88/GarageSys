using GarageSys.Core.Models;
using GarageSys.WebUI.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace GarageSys.WebUI.ViewModels
{
    public class BookingVM
    {
        [Required]
        [MinLength(1,ErrorMessage ="You must Chose Service")]
        public int[] ServiceIds { get; set; } = default!;
        [Required]
        //[ValidDate]
        public string BookingDate { get; set; } = string.Empty;
        public string Desc { get; set; } = string.Empty;
        public List<SelectListItem>? servicesList { get; set; } = default!;
        public string[]? EnableHours { get; set; } =default!;
    }
}
