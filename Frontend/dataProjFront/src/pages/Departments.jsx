import React, { useState, useEffect } from 'react';

const DepartmentsMenu = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://199.212.26.208:1521/SQLD');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchData();
  }, []);

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
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsMenu;
