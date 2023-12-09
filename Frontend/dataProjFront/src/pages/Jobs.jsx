import {React, useState, useEffect} from 'react'
import Header from "/src/components/Header.jsx"
import Footer from "/src/components/Footer.jsx"
import "/src/styles/Jobs.css"
function Jobs() {
  const [inputJobId, setInputJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  
  const [jobID, setJobID] = useState([])
  const [jobTitles, setJobTitles] = useState([]);
  const [minSalary, setMinSalary] = useState([]);
  const [maxSalary, setMaxSalary] = useState([]);
  const [data, setData] = useState(null);

  const [jobIds, setJobIds] = useState([]);
//JOB ID, JOB TITLE, MINSALARYU, MAXSALARY
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        setData(data);

        const uniqueJobID = new Set(data.Employees.map(employee => employee.job_ID));
        const uniqueJobIDArray = [...uniqueJobID];
        setJobID(uniqueJobIDArray);

        
        const uniqueJobTitles = new Set(data.Employees.map(employee => employee.dept_Name));
        const uniqueJobTitlesArray = [...uniqueJobTitles];
        setJobTitles(uniqueJobTitlesArray);

        
        const uniqueMinSal = new Set(data.Employees.map(employee => employee.min_Salary));
        const uniqueMinSalArray = [...uniqueMinSal];
        setMinSalary(uniqueMinSalArray);

        const uniqueMaxSal = new Set(data.Employees.map(employee => employee.max_Salary));
        const uniqueMaxSalArray = [...uniqueMaxSal];
        setMaxSalary(uniqueMaxSalArray);


      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []);

  

  function checkID(e){
    e.preventDefault();
    if (data && data.Employees) {
      const employee = data.Employees.find((employee) => employee.job_ID === inputJobId);
      if (employee) {
        console.log("Employee Data:", employee);
        setJobTitle(employee.dept_Name);
      } else {
        setJobTitle('Job not found');
      }
    } else {
      console.log("Data is null or does not have the Employees property");
    }
  }

  function updateColumn(updatedData) {
    
    console.log('Updating database:', updatedData);

    fetch(`/api/updateJob/${updatedData.job_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newJobTitle: updatedData.job_Title,  
        newMinSalary: updatedData.min_Salary, 
        newMaxSalary: updatedData.max_Salary, 
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response as needed
      })
      .catch(error => {
        console.error('Error updating job data:', error);
      });
  }

  return (
   <>
   <Header/>
   <div className="jobsMenuBody">
    <div className="IdtjobDesc">
    <div className="search">
    <h1>Identify Job Description</h1>
    <form>
    <label htmlFor="">Enter job ID: </label>
    <input type="text" placeholder='JOB_ID' onChange={(e) => setInputJobId(e.target.value)}/>
    <input type="submit" value="Find" onClick={checkID}/>
    </form>
    </div>
    <div className="searchResult">
      <h1>Job description:</h1>
      <h3>{jobTitle}</h3>
    </div>


    </div>
    <div className="editJob">
    <div className="columns">
    <div className="column">
      <h4>JOB ID</h4>
      <ul>
    {jobID.map((id, index) => (
      <li key={id}>
        {jobID[index]} 
      </li>
    ))}
  </ul>
    </div>
    <div className="column">
      <h4>JOB TITLE</h4>
      <ul>
    {jobTitles.map((id, index) => (
      <li key={id}>
        <input type="text" defaultValue= {jobTitles[index]}  onChange={(e) => {
                        const updatedData = [...jobTitles];
                        updatedData[index] = e.target.value;
                        setJobTitles(updatedData);
                        updateColumn(updatedData);
                      }}  />
       
      </li>
    ))}
  </ul>
    </div>
    <div className="column">
      <h4>MIN SALARY</h4>
      <ul>
    {minSalary.map((id, index) => (
      <li key={id}>
      
        <input type="text" defaultValue=   {minSalary[index]}  onChange={(e) => {
                        const updatedData = [...minSalary];
                        updatedData[index] = e.target.value;
                        setMinSalary(updatedData);
                        updateColumn(updatedData);
                      }}   />
      </li>
    ))}
  </ul>
    </div>
    <div className="column">
      <h4>MAX SALARY</h4>
      <ul>
    {maxSalary.map((id, index) => (
      <li key={id}>
       
        <input type="text" defaultValue=    {maxSalary[index]} onChange={(e) => {
                        const updatedData = [...maxSalary];
                        updatedData[index] = e.target.value;
                        setMaxSalary(updatedData);
                        updateColumn(updatedData);
                      }}   />
      </li>
    ))}
  </ul>
    </div>
    </div>
    
    </div>
   

   </div>
   <Footer/>
   </>
  )
}

export default Jobs