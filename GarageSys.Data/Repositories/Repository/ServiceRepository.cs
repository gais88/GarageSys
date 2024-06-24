﻿using GarageSys.Core.Models;
using GarageSys.Data.Context;
using GarageSys.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageSys.Data.Repositories.Repository
{
    public class ServiceRepository : GenericRepository<Service>, IServiceRepository
    {
        public ServiceRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
