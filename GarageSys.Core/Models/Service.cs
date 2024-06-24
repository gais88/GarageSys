using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Core.Models
{
    public class Service: AuditableEntity
    {
        public string Title { get; set; } = string.Empty;
        public string? Desc { get; set; }
    }
}
