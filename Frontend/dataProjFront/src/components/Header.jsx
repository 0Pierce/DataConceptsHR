import React from 'react'
import "/src/styles/Header.css"
import {Link} from "react-router-dom";

function header() {
  return (
    <>
    <div className="headerBody">
      <h1>HR Application</h1>
      <ul>
        <li><Link to="/"> | Employees |</Link></li>
        <li><Link to="/Jobs">| Jobs Menu |</Link></li>
        <li><Link to="/Departments">| Departments Menu| </Link></li>
      </ul>
        
    </div>
    </>

  )
}

export default header