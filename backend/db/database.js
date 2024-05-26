const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "code",
  database: "weatherApp",
});

module.exports = connection;
