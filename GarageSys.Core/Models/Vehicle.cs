using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Core.Models
{
    public class Vehicle : AuditableEntity
    {
        public string PlateNumber { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public List<VehicleSpec>? VehicleSpecs { get; set; }
    }
}
