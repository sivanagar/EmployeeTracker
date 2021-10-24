const mysql = require("mysql2");

//connect to database
const db = mysql.createPool(
    {
      host: "localhost",
      user: "root",
      password: "root",
      database: "companyemployees",
    }
  );

  module.exports = db.promise();