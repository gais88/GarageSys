using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Core.Models
{
    public class Customer : AppUser
    {
        public string? Address { get; set; } = string.Empty;
        public List<Booking>? Bookings { get; set; }
        public List<Vehicle>? Vehicles { get; set; }
    }
}
