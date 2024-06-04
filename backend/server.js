require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db/databaseConnection");
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("./route/routes");
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(bodyParser.json());
//end of middleware

//routes path
app.use("/", route);

//listening on port 3000
app.listen(port, () => {
  //establishing a connection to mysql2 database
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database as id " + connection.threadId);
  });
  console.log("server running on port " + port);
});
