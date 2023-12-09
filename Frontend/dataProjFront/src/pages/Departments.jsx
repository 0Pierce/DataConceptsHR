import React, { useState, useEffect } from 'react';

const DepartmentsMenu = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [HR_Employees, setHR_Employees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://199.212.26.208:1521/SQLD/departments');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://199.212.26.208:1521/SQLD/employees/${selectedDepartment}`);
        const data = await response.json();

        const mappedEmployees = data.map(row => ({
          employee_ID: row.employee_ID,
          fName: row.fName,
          lName: row.lName,
          email: row.email,
          phone_Num: row.phone_Num,
          hire_Date: row.hire_Date,
          job_ID: row.job_ID,
          salary: row.salary,
          comm: row.comm,
          manager_ID: row.manager_ID,
          dept_ID: row.dept_ID,
          job_Title: row.job_Title,
          min_Salary: row.min_Salary,
          max_Salary: row.max_Salary,
          dept_Name: row.dept_Name,
          location_ID: row.location_ID,
        }));

        setHR_Employees(mappedEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (selectedDepartment) {
      fetchEmployeeData();
    }
  }, [selectedDepartment]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div>
      <header style={{ backgroundColor: '#333', color: 'white', padding: '10px', textAlign: 'center' }}>
        <h1>Departments Menu</h1>
      </header>
      <div className="container" style={{ width: '80%', margin: '20px auto' }}>
        <label htmlFor="departments">Select a department:</label>
        <select
          id="departments"
          name="departments"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">Select...</option>
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>

        {selectedDepartment && (
          <div>
            <h2>{selectedDepartment}</h2>
            {HR_Employees.length > 0 ? (
              <ul>
                {HR_Employees.map((employee) => (
                  <li key={employee.employee_ID}>
                    <strong>{employee.fName} {employee.lName}</strong> - {employee.job_Title}
                    <br />
                    Email: {employee.email}, Phone: {employee.phone_Num}
                    <br />
                    Hire Date: {employee.hire_Date}, Salary: {employee.salary}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No employee data available for this department.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsMenu;


