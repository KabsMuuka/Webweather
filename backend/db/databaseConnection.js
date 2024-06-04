const mysql = require("mysql2");

//Connecting to mysql database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "code",
  database: "weatherApp",
});

module.exports = connection;
