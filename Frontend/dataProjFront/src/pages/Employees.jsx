import {React, useState, useEffect, useMemo} from 'react'
import "/src/styles/Employees.css"
import Header from "/src/components/Header.jsx"
import Footer from "/src/components/Footer.jsx"

function Employees() {
    


    const [jobIds, setJobIds] = useState([]);
    const [jobTitles, setJobTitles] = useState([])

    useEffect(() => {
        const fetchJobIds = async () => {
          try {
            const response = await fetch('/api');
            const data = await response.json();
      
            // Use Set to store unique job IDs
            const uniqueJobIds = new Set(data.Employees.map(employee => employee.job_ID));
      
            // Convert Set back to an array
            const uniqueJobIdsArray = [...uniqueJobIds];
      
            setJobIds(uniqueJobIdsArray);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchJobIds();
      }, []);


  return (
    <>
   <Header/>

   <div className="employeeBody">
        
        <div className="employeeForm">
        <form>
        <h2>Employee Hiring Form</h2>
        <div className="personalInfo">
            <div className="firstInf">
                <input type="text" placeholder='First Name: ' required />
                <input type="text" placeholder='Last Name:' required />
                <input type="email" placeholder='Email: ' required />
            </div>
            <div className="secondInf">
                <input type="number" placeholder='Phone:' required />
                <input type="date" placeholder='Date:' required />
                <input type="number" min="1" placeholder='$ Salary:' required />
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
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
            
            </select>

           </div>
        </div>
        <div className="manInfo">
            
            <div className="empID">
                <label htmlFor="EMPLOYEE_ID">Employee ID</label>
            <select name="EMPLOYEE_ID" id="EMPLOYEE_ID" required>
            <option value="" disabled selected>Select Manager ID</option>
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
            </select>
            </div>
            <div className="fNameInfo">
            <label htmlFor="FIRST_NAME">First Name</label>
            <select name="FIRST_NAME" id="FIRST_NAME" required>
            <option value="" disabled selected>Select First Name</option>
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
            </select>
            </div>
            <div className="lNameInfo">
            <label htmlFor="LAST_NAME">Last Name</label>
            <select name="LAST_NAME" id="LAST_NAME" required>
            <option value="" disabled selected>Select Last Name</option>
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
            </select>
            </div>
        </div>

        <div className="deptInfo">
            <div className="deptID">
                <label htmlFor="DEPARTMENT_ID">Department ID</label>
                <select name="DEPARTMENT_ID" id="DEPARTMENT_ID" required>
                <option value="" disabled selected>Select Manager ID</option>
                 <option value="Q1">Q1</option>
                 <option value="Q2">Q2</option>
                </select>
            </div>
            <div className="deptName">
            <label htmlFor="DEPARTMENT_NAME">Department Name</label>
            <select name="DEPARTMENT_NAME" id="DEPARTMENT_NAME" required>
            <option value="" disabled selected>Select Dept.. Name</option>
             <option value="Q1">Q1</option>
             <option value="Q2">Q2</option>
            </select>
            </div>
        </div>
        <div className="smbBtn"><input type="submit"></input></div>
        
    </form>
    </div>
    
   </div>
   
   
   

    <Footer/>
    </>
    
  )
}

export default Employees