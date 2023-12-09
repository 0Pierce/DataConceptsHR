import React, { useState, useEffect } from 'react';

const DepartmentsMenu = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [HR_Employees, setHR_Employees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/departments');
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
        const response = await fetch(`http://localhost:5173/api/employees/${selectedDepartment}`);
        const data = await response.json();

        const mappedEmployees = data.map((row) => ({
          employee_ID: row[0],
          fName: row[1],
          lName: row[2],
          email: row[3],
          phone_Num: row[4],
          hire_Date: row[5],
          job_ID: row[6],
          salary: row[7],
          comm: row[8],
          manager_ID: row[9],
          dept_ID: row[10],
          job_Title: row[11],
          min_Salary: row[12],
          max_Salary: row[13],
          dept_Name: row[14],
          location_ID: row[15],
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


export default DepartmentsMenu;
