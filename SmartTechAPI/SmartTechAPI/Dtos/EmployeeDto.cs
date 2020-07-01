using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SmartTechAPI.Dtos
{
    public class EmployeeDto
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public int Salary { get; set; }
        public string Location { get; set; }
        public string DepartmentName { get; set; }
        public int DepartmentID { get; set; }
        public int EmpID { get; set; }
    }
}