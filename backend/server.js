const express = require("express");
const app = express();
const connection = require("./db/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

//middleware
app.use(cors());
app.use(bodyParser.json());
//end of middleware

app.post("/api/weather", async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res
      .status(401)
      .json({ error: "use propper City Names E.g. lusaka" });
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=42e6202c53c94387b0d82647232012&q=${city}`
    );
    const weatherdata = await response.json();
    res.status(200).json(weatherdata); //send to the frontend

    //destracturing weather data in order to save in properly into the database
    const { name, country, localtime } = weatherdata.location;
    const { temp_c } = weatherdata.current;
    const { text } = weatherdata.current.condition;

    //all data
    connection
      .promise()
      .query(
        "INSERT INTO cities(name, country, `localtime`, temp_c, `text`) VALUES(?, ?, ?, ?, ?)",
        [name, country, localtime, temp_c, text]
      )
      .then((result) => {
        if (!result) {
          console.log(
            "failed to save data into the database! inspect database tables"
          );
        } else {
          console.log("successfully saved your data ");
        }
      });
  } catch (error) {
    res
      .status(404)
      .json({ error: `Specified city name : ${city} Not found` }, error);
  }
});

app.post("/favoriteCity", async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res
      .status(401)
      .json({ error: "use propper City Names E.g. lusaka" });
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=42e6202c53c94387b0d82647232012&q=${city}`
    );
    const weatherdata = await response.json();
    res.status(200).json(weatherdata); //send to the frontend

    //destracturing weather data in order to save in properly into the database
    const { name, country, localtime } = weatherdata.location;
    const { temp_c } = weatherdata.current;
    const { text } = weatherdata.current.condition;

    //favorite data
    connection
      .promise()
      .query(
        "INSERT INTO favoriteCity(name, country, `localtime`, temp_c, `text`) VALUES(?, ?, ?, ?, ?)",
        [name, country, localtime, temp_c, text]
      )
      .then((result) => {
        if (!result) {
          console.log(
            "failed to save data into the database! inspect database tables"
          );
        } else {
          console.log("successfully saved your data ");
        }
      });
  } catch (error) {
    res
      .status(404)
      .json({ error: `Specified city name : ${city} Not found` }, error);
  }
});

//reterive All weatherdata from the database
app.get("/storedData", (req, res) => {
  connection.query(`SELECT * FROM cities`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
});

//reterive only favorte cities
app.get("/favoriteCity", (req, res) => {
  connection.query(`SELECT * FROM favoriteCity`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Connected to the database as id " + connection.threadId);
  });
  console.log("server running on port " + port);
});
