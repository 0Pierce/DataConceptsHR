const express = require("express");
const app = express();
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
const conn = 0;
async function getDatabaseConnection() {
  try {
    const conn = await oracledb.getConnection(config);
    console.log("Connected to the School database!");
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
    console.log(HR_Employees);
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
    console.log("Ordered HR Employees:", HR_Employees);
    res.json({ Employees: HR_Employees });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
