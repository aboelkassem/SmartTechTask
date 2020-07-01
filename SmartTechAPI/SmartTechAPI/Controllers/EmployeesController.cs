using SmartTechAPI.Dtos;
using SmartTechAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SmartTechAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class EmployeesController : ApiController
    {
        private ApplicationDbContext _db = new ApplicationDbContext();

        //GET: api/employees
        [HttpGet]
        public IHttpActionResult GetAllEmployees()
        {
            var employees = new List<EmployeeDto>();

            foreach (var employee in _db.Employees.ToList())
            {
                employees.Add(new EmployeeDto
                {
                    EmpID = employee.Id,
                    Name = employee.Name,
                    Gender = employee.Gender,
                    Location = employee.Location,
                    Salary = employee.Salary,
                    DepartmentName = employee.Department.Name,
                    DepartmentID = employee.DepartmentId
                });
            }

            return Ok(employees);
        }


        [HttpGet]
        public IHttpActionResult GetEmployee(int id)
        {
            var emp = _db.Employees.FirstOrDefault(e => e.Id == id);

            if (emp == null)
            {
                return NotFound();
            }

            var empDto = new EmployeeDto
            {
                EmpID = emp.Id,
                Name = emp.Name,
                Gender = emp.Gender,
                Salary = emp.Salary,
                Location = emp.Location,
                DepartmentName = emp.Department.Name,
                DepartmentID = emp.DepartmentId
            };

            return Ok(empDto);
        }

        [HttpDelete]
        public IHttpActionResult DeleteEmployee(int id)
        {
            var emp = _db.Employees.FirstOrDefault(e => e.Id == id);

            if (emp == null)
            {
                return NotFound();
            }

            _db.Employees.Remove(emp);
            _db.SaveChanges();
            return Ok("Employee Deleted Successfully");
        }


        [HttpGet]
        [Route("~/api/departments")]
        public IHttpActionResult GetDepartments()
        {
            return Ok(_db.Departments.Include(e => e.Employees).ToList());
        }

        [HttpGet]
        [Route("~/api/department/{deptId:int}")]
        public IHttpActionResult GetDepartments(int deptId)
        {
            return Ok(_db.Departments.Include(e => e.Employees).FirstOrDefault(d => d.Id == deptId));
        }

        [HttpGet]
        [Route("~/api/{deptId:int}/employees")]
        public IHttpActionResult GetEmployeesOfDepartment(int deptId)
        {
            var department = _db.Departments.FirstOrDefault(d => d.Id == deptId);
            if (department == null)
            {
                return NotFound();
            }

            var employees = new List<EmployeeDto>();
            foreach (var employee in department.Employees.ToList())
            {
                employees.Add(new EmployeeDto
                {
                    EmpID = employee.Id,
                    Name = employee.Name,
                    Gender = employee.Gender,
                    Location = employee.Location,
                    Salary = employee.Salary,
                    DepartmentName = employee.Department.Name,
                    DepartmentID = employee.DepartmentId
                });
            }

            return Ok(employees);
        }


        // Post: api/employees
        [HttpPost]
        public IHttpActionResult CreateEmployee([FromBody] Employee employee)
        {
            try
            {
                _db.Employees.Add(employee);
                _db.SaveChanges();
                return Created("~/api/employees/" + employee.Id.ToString(), employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/department
        [HttpPost]
        [Route("~/api/department")]
        public IHttpActionResult CreateDepartment([FromBody] Department department)
        {
            try
            {
                _db.Departments.Add(department);
                _db.SaveChanges();
                return Created("~/api/department/" + department.Id.ToString(), department);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
