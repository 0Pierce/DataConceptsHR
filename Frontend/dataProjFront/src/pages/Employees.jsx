import {React, useState, useEffect, useMemo} from 'react'
import "/src/styles/Employees.css"
import Header from "/src/components/Header.jsx"
import Footer from "/src/components/Footer.jsx"

function Employees() {
    
  //==============================================
  //NOTE:
  /* 
  I believe the firstName and last name should probably automatically pop up
  when you select one of them, however, that isnt listed in the assignment documents and I also been awake
  for 2 days shuffling between projects, so I wont be able to include that, also considering only two of us
  are working on the project.
   */
  //==============================================
  const [data, setData] = useState(null); // Define data state
    const [jobIds, setJobIds] = useState([]);
    const [jobTitles, setJobTitles] = useState([])
    const [employeeID, setEmployeeID] = useState([])
    const [fName, setfName] = useState([])
    const [lName, setlName] = useState([])
    const [deptID, setdeptID] = useState([])
    const [deptName, setdeptName] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState('');
    
        const fetchJobIds = async () => {
          try {
            const response = await fetch('/api');
            const data = await response.json();
            setData(data);
            // Use Set to store unique job IDs
            const uniqueJobIds = new Set(data.Employees.map(employee => employee.job_ID));
            // Convert Set back to an array
            const uniqueJobIdsArray = [...uniqueJobIds];
            setJobIds(uniqueJobIdsArray);

            const uniqueJobTitles = new Set(data.Employees.map(employee => employee.job_Title));
            const uniqueJobTitlesArray = [...uniqueJobTitles];
            setJobTitles(uniqueJobTitlesArray);

            const uniqueEmpID = new Set(data.Employees.map(employee => employee.employee_ID));
            const uniqueEmpIDArray = [...uniqueEmpID];
            setEmployeeID(uniqueEmpIDArray);

            const uniquefName = new Set(data.Employees.map(employee => employee.fName));
            const uniquefNameArray = [...uniquefName];
            setfName(uniquefNameArray);

            const uniquelName = new Set(data.Employees.map(employee => employee.lName));
            const uniquelNameArray = [...uniquelName];
            setlName(uniquelNameArray);

            const uniquedeptID = new Set(data.Employees.map(employee => employee.dept_ID));
            const uniquedeptIDArray = [...uniquedeptID];
            setdeptID(uniquedeptIDArray);

            const uniquedeptName = new Set(data.Employees.map(employee => employee.dept_Name));
            const uniquedeptNameArray = [...uniquedeptName];
            setdeptName(uniquedeptNameArray);
            
            
            
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        useEffect(() => {
          fetchJobIds();
        }, []);

      function editEmployee(id){
        console.log(id);

        const clickedEmployee = data.Employees.find(employee => employee.employee_ID === id);
    
        setSelectedEmployee(clickedEmployee);
        setSelectedEmployeeName(`${clickedEmployee?.fName} ${clickedEmployee?.lName}`);
      }

      function changeEmployeeData(){
        if (!selectedEmployee) {
          console.error("No employee selected for update.");
          return;
        }
      
        const newSalary = document.getElementById("newSalary").value;
        const newEmail = document.getElementById("newEmail").value;
        const newPhone = document.getElementById("newPhone").value;
      
        // Make sure at least one field has a new value
        if (!newSalary && !newEmail && !newPhone) {
          console.error("No changes provided.");
          return;
        }
      
        const updateData = {};
      
        if (newSalary) {
          updateData.salary = newSalary;
        }
      
        if (newEmail) {
          updateData.email = newEmail;
        }
      
        if (newPhone) {
          updateData.phone = newPhone;
        }
      
        // Make the API request
        fetch(`/api/updateEmployee/${selectedEmployee.employee_ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data); 
          
            fetchJobIds();
          })
          .catch((error) => {
            console.error("Error updating employee data:", error);
          });

      }

      const hireEmployee = async (formData) => {
        try {
          console.log("Fetching");
          const response = await fetch("/api/hireEmployee", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          console.log("Fetched");
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Data:', data);
      
          console.log('Finished');
        } catch (error) {
          console.error("Error hiring employee:", error);
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = {
          p_first_name: document.getElementById("first_name").value,
          p_last_name: document.getElementById("last_name").value,
          p_email: document.getElementById("email2").value,
          p_phone: document.getElementById("phone2").value,
          p_hire_date: document.getElementById("hire_date").value,
          p_salary: document.getElementById("salary2").value,
          p_job_id: document.getElementById("JOB_ID").value,
          p_manager_id: document.getElementById("EMPLOYEE_ID").value,
          p_department_id: document.getElementById("DEPARTMENT_ID").value,
        };
    
        
        hireEmployee(formData);
      };

  return (
    <>
   <Header/>

   <div className="employeeBody">
        <div className="editEmployeesBody">
        <div className="employeeList">
        <ul>
    {employeeID.map((id, index) => (
      <li key={id} onClick={() => editEmployee(id)}>
        {fName[index]} {lName[index]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {id}
      </li>
    ))}
  </ul>
        </div>
        <div className="editEmployeeForm">
          <h1>Edit employee</h1>
          <h3>Name:{selectedEmployeeName}</h3>
          <div className="empFields">

          <label htmlFor="salary">Salary:</label>
              <div className="empField">
             
              <input type="text" placeholder="Salary" id='salary' value={selectedEmployee?.salary ?? 'Null'} />
              <input type="text" name="" id="newSalary" placeholder='new Salary' />
              </div>
              <label htmlFor="email">Email:</label>
              <div className="empField">
             
              <input type="email" placeholder="Email" id='email' value={selectedEmployee?.email ?? 'Null'} />
              <input type="text" name="" id="newEmail" placeholder='new Email' />
              </div>
              <label htmlFor="phone">Phone:</label>
              <div className="empField">
              <input type="text" placeholder="Phone" id='phone' value={selectedEmployee?.phone_Num ?? 'Null'} />
              <input type="text" name="" id="newPhone" placeholder='new Phone' />
              </div>
          </div>

          
          <button onClick={changeEmployeeData}>Confirm Changes</button>
        </div>
        </div>








        <div className="employeeForm">
        <form>
        <h2>Employee Hiring Form</h2>
        <div className="personalInfo">
            <div className="firstInf">
                <input type="text" id='first_name' placeholder='First Name: ' required />
                <input type="text" id='last_name' placeholder='Last Name:' required />
                <input type="email" id='email2' placeholder='Email: ' required />
            </div>
            <div className="secondInf">
                <input type="number"id='phone2' placeholder='Phone:' required />
                <input type="date" id='hire_date' placeholder='Date:' required />
                <input type="number" id='salary2' min="1" placeholder='$ Salary:' required />
            </div>
        </div>
        <div className="jobDesc">
            <div className="jobID">
            <label htmlFor="JOB_ID">JOB ID</label>
           <select name="JOB_ID" id="JOB_ID" required  >
           <option value="" disabled selected>Select Job ID</option>
           {jobIds.map(jobId => <option key={jobId} value={jobId}>{jobId}</option>)}
           </select>

            </div>
           <div className="jobTitle">
            <label htmlFor="JOB_TITLE">JOB TITLE</label>
             <select name="JOB TITLE" id="JOB_TITLE" required>
             <option value="" disabled selected>Select Manager ID</option>
             {jobTitles.map(jobTitles => <option key={jobTitles} value={jobTitles}>{jobTitles}</option>)}
            
            </select>

           </div>
        </div>
        
        <div className="manInfo">
          <h3>Manager: </h3>
        <div className="manInfoContent">


            <div className="empID">
                <label htmlFor="EMPLOYEE_ID">Employee ID</label>
            <select name="EMPLOYEE_ID" id="EMPLOYEE_ID" required>
            <option value="" disabled selected>Select Manager ID</option>
            {employeeID.map(employeeID => <option key={employeeID} value={employeeID}>{employeeID}</option>)}
            </select>
            </div>
            <div className="fNameInfo">
            <label htmlFor="FIRST_NAME">First Name</label>
            <select name="FIRST_NAME" id="FIRST_NAME" required>
            <option value="" disabled selected>Select First Name</option>
            {fName.map(fName => <option key={fName} value={fName}>{fName}</option>)}
            </select>
            </div>
            <div className="lNameInfo">
            <label htmlFor="LAST_NAME">Last Name</label>
            <select name="LAST_NAME" id="LAST_NAME" required>
            <option value="" disabled selected>Select Last Name</option>
            {lName.map(lName => <option key={lName} value={lName}>{lName}</option>)}
            </select>
            </div>
            </div>
        </div>

        <div className="deptInfo">
            <div className="deptID">
                <label htmlFor="DEPARTMENT_ID">Department ID</label>
                <select name="DEPARTMENT_ID" id="DEPARTMENT_ID" required>
                <option value="" disabled selected>Select Manager ID</option>
                {deptID.map(deptID => <option key={deptID} value={deptID}>{deptID}</option>)}
                </select>
            </div>
            <div className="deptName">
            <label htmlFor="DEPARTMENT_NAME">Department Name</label>
            <select name="DEPARTMENT_NAME" id="DEPARTMENT_NAME" required>
            <option value="" disabled selected>Select Dept.. Name</option>
            {deptName.map(deptName => <option key={deptName} value={deptName}>{deptName}</option>)}

            </select>
            </div>
        </div>
        <div className="smbBtn"><input type="submit" value="Hire" onClick={handleSubmit}></input></div>
        
    </form>
    </div>
    
   </div>
   
   
   

   <Footer/>
    </>
    
  )
}

export default Employees