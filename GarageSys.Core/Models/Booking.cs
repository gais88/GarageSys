using GarageSys.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Core.Models
{
    public class Booking: AuditableEntity
    {
        
        public string Title { get; set; } = string.Empty;
        public string? Desc { get; set; }
        public DateTime BookingDate { get; set; }
        public BookingState BookingState { get; set; }
        public string ServiceIds { get; set; } =string.Empty;
        public int CustomerId { get; set; }
        [ForeignKey("CustomerId")]
        public Customer? Customer { get; set; } 
    }
}
