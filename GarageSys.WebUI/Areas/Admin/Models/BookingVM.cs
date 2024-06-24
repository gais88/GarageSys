using GarageSys.Core.Enums;
using GarageSys.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace GarageSys.WebUI.Areas.Admin.Models
{
    public class BookingVM
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Desc { get; set; }
        public DateTime BookingDate { get; set; }
        public BookingState BookingState { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}
