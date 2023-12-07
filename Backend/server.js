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

async function getDatabaseConnection() {
  app.get("/api", async (req, res) => {
    try {
      const conn = await oracledb.getConnection(config);
      console.log("Connected to the School database!");

      const result = await conn.execute("SELECT * FROM HR_EMPLOYEES");
      const HR_Employees = result.rows;
      res.json({ Employees: HR_Employees });
    } catch (err) {
      console.log("Connection error:", err);
    }
  });
}

getDatabaseConnection();
