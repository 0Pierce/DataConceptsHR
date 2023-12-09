const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//
//===============================================================
//Oracle DB
//===============================================================
//
const oracledb = require("oracledb");
const config = {
  user: "COMP214_F23_ers_33",
  password: "password",
  connectString: "199.212.26.208:1521/SQLD",
};

//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
async function createDatabaseConnection() {
  try {
    const conn = await oracledb.getConnection(config);
    console.log("Connected to the School database!");
    return conn;
  } catch (err) {
    console.log("Connection error:", err);
    throw err;
  }
}

async function getDatabaseConnection() {
  let conn;

  try {
    conn = await createDatabaseConnection();
    const query = `
    SELECT E.*, J.*, D.*
    FROM HR_EMPLOYEES E
    JOIN HR_JOBS J ON E.JOB_ID = J.JOB_ID
    JOIN HR_DEPARTMENTS D ON E.DEPARTMENT_ID = D.DEPARTMENT_ID
  `;
    const result = await conn.execute(query);
    const HR_Employees = result.rows.map((row) => ({
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
      dept_Name: row[12],
      min_Salary: row[13],
      max_Salary: row[14],
      location_ID: row[15],
    }));
    // console.log(HR_Employees);
    return HR_Employees;
  } catch (err) {
    console.log("Connection error:", err);
    throw err;
  } finally {
    try {
      if (conn) {
        await conn.close();
        console.log("Connection closed.");
      }
    } catch (err) {
      console.error("Error closing connection:", err);
    }
  }
}

app.get("/api", async (req, res) => {
  try {
    const HR_Employees = await getDatabaseConnection();
    // console.log("Ordered HR Employees:", HR_Employees);
    res.json({ Employees: HR_Employees });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//
//=============================================================================
//Update Employee Data - Employees Page
//=============================================================================
//
app.put("/api/updateEmployee/:employeeId", async (req, res) => {
  console.log("2");
  const employeeId = req.params.employeeId;
  const { salary, email, phone } = req.body;
  console.log("1");
  const conn = null;
  try {
    console.log("Before DB connectio");
    const conn = await createDatabaseConnection();
    console.log("Connected to DB");
    const updateQuery = `
      UPDATE HR_EMPLOYEES
      SET SALARY = :salary, EMAIL = :email, PHONE_NUMBER = :phone
      WHERE EMPLOYEE_ID = :employeeId
    `;

    const bindParams = {
      salary,
      email,
      phone,
      employeeId,
    };
    console.log("Before execute");
    const updatedata = await conn.execute(updateQuery, bindParams, {
      autoCommit: true,
    });
    console.log("After execute");
    res.json({ success: true, message: "Employee data updated successfully" });
  } catch (err) {
    console.error("Error updating employee data:", err);
    res.status(500).json({ error: "Internal Server Error" });
    console.error("Error updating employee data:", err.message);
  } finally {
    try {
      if (conn) {
        await conn.close();
        console.log("Connection closed.");
      }
    } catch (err) {
      console.error("Error closing connection:", err);
    }
  }
});

//
//=============================================================================
//Send Hire form - Employees Page
//=============================================================================
//
app.post("/api/hireEmployee", async (req, res) => {
  console.log("Received request:", req);
  console.log("Request body:", req.body);
  const {
    p_first_name,
    p_last_name,
    p_email,
    p_salary,
    p_hire_date,
    p_phone,
    p_job_id,
    p_manager_id,
    p_department_id,
  } = req.body;
  console.log("Received data for hiring employee:");
  console.log("First Name:", p_first_name);
  console.log("Last Name:", p_last_name);
  console.log("Email:", p_email);
  console.log("Salary:", p_salary);
  console.log("Hire Date:", p_hire_date);
  console.log("Phone:", p_phone);
  console.log("Job ID:", p_job_id);
  console.log("Manager ID:", p_manager_id);
  console.log("Department ID:", p_department_id);
  let conn;

  try {
    console.log("Before connection");
    conn = await createDatabaseConnection();

    // Call the stored procedure
    const result = await conn.execute(
      `
      BEGIN
        Employee_hire_sp(
          :p_first_name,
          :p_last_name,
          :p_email,
          :p_salary,
          TO_DATE(:p_hire_date, 'YYYY-MM-DD'),
          :p_phone,
          :p_job_id,
          :p_manager_id,
          :p_department_id
        );
      END;
      `,
      {
        p_first_name: p_first_name,
        p_last_name: p_last_name,
        p_email: p_email,
        p_salary: p_salary,
        p_hire_date: p_hire_date,
        p_phone: p_phone,
        p_job_id: p_job_id,
        p_manager_id: p_manager_id,
        p_department_id: p_department_id,
      }
    );

    res.json({ success: true, message: "Employee hired successfully" });
  } catch (err) {
    console.error("Error hiring employee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await conn.close();
  }
});

//
//=============================================================================
//Update HR Colums - from Jobs Menu
//=============================================================================
//
app.put("/api/updateJob/:jobId", async (req, res) => {
  console.log("Updating");

  const { newJobTitle, newMinSalary, newMaxSalary } = req.body;
  const conn = null;
  try {
    const conn = await createDatabaseConnection();

    const updateQuery = `
      UPDATE HR_JOBS
      SET JOB_TITLE = :newJobTitle, MIN_SALARY = :newMinSalary, MAX_SALARY = :newMaxSalary
      
    `;

    const bindParams = {
      newJobTitle,
      newMinSalary,
      newMaxSalary,
    };
    console.log("Update Query:", updateQuery);
    console.log("Bind Params:", bindParams);
    console.log("Before execute");
    await conn.execute(updateQuery, bindParams, {
      autoCommit: true,
    });
    console.log("After execute");
    res.json({ success: true, message: "Job data updated successfully" });
  } catch (err) {
    console.error("Error updating job data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (conn) {
      await conn.close();
    }
  }
});
