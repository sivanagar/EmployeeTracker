const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "root",
      database: "companyemployees",
    },
    console.log("Connected to the companyEmployees database.")
  );

  module.exports = db;