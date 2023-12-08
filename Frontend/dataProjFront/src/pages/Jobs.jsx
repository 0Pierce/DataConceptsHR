import {React, useState, useEffect} from 'react'
import Header from "/src/components/Header.jsx"
import Footer from "/src/components/Footer.jsx"
import "/src/styles/Jobs.css"
function Jobs() {
  const [inputJobId, setInputJobId] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        setData(data);
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

    </div>
   

   </div>
   <Footer/>
   </>
  )
}

export default Jobs