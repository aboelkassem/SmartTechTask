using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SmartTechAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("SmartTech")
        {

        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}