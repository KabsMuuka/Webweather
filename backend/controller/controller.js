const connection = require("../db/databaseConnection");

const postCityName = async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res
      .status(401)
      .json({ error: "use propper City Names E.g. lusaka" });
  }
  try {
    //fetch data from from an API, after appending {city} to it.
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=42e6202c53c94387b0d82647232012&q=${city}`
    );
    const weatherdata = await response.json();
    res.status(200).json(weatherdata); //send to the frontend

    //destructuring weather object properties from weatherdata
    const { name, country, localtime } = weatherdata.location;
    const { temp_c } = weatherdata.current;
    const { text } = weatherdata.current.condition;

    //inserting weather properties into the database
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
    res.status(500).json({
      error: `Cannot find ${city} provided. Check your internet connection.`,
    });
  }
};

const postFavCity = async (req, res) => {
  const { city } = req.body;
  if (!city) {
    return res
      .status(401)
      .json({ error: "use propper City Names E.g. lusaka" });
  }
  try {
    //fetch data from from an API, after appending {city} to it.
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=42e6202c53c94387b0d82647232012&q=${city}`
    );
    const weatherdata = await response.json();
    res.status(200).json(weatherdata); //send to the frontend

    //destructuring weather object properties from weatherdata
    const { name, country, localtime } = weatherdata.location;
    const { temp_c } = weatherdata.current;
    const { text } = weatherdata.current.condition;

    //inserting weather properties into the database
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
    res.status(500).json({
      error: `Cannot find ${city} provided. Check your internet connection.`,
    });
  }
};

const getCities = (req, res) => {
  connection.query(`SELECT * FROM cities`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
};

//retrieve Only favorte cities
const getFavoriteCity = (req, res) => {
  connection.query(`SELECT * FROM favoriteCity`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
};

//Delete end point from cities database table
const deleteCity = (req, res) => {
  const { id } = req.body; // id from a specific weather card
  //check if id valid
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  connection.query(
    `SELECT * FROM cities WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database query error" });
      }
      if (results.length > 0) {
        //delete id that matches client id button
        connection.query(`DELETE FROM cities WHERE id = ?`, [id], (error) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Failed to delete the weather card" });
          }
          return res
            .status(200)
            .json({ message: "Weather card deleted successfully" });
        });
      } else {
        return res.status(404).json({ message: "ID not found" });
      }
    }
  );
};

////Delete end point from favorite city database table
const deleteFavoriteCity = (req, res) => {
  const { id } = req.body; // id from a specific weather card

  //check if id valid
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  connection.query(
    `SELECT * FROM favoriteCity WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Database query error" });
      }
      if (results.length > 0) {
        //delete id that matches client id button
        connection.query(
          `DELETE FROM favoriteCity WHERE id = ?`,
          [id],
          (error) => {
            if (error) {
              return res
                .status(500)
                .json({ message: "Failed to delete the weather card" });
            }
            return res
              .status(200)
              .json({ message: "Weather card deleted successfully" });
          }
        );
      } else {
        return res.status(404).json({ message: "ID not found" });
      }
    }
  );
};

module.exports = {
  postCityName,
  postFavCity,
  getCities,
  getFavoriteCity,
  deleteCity,
  deleteFavoriteCity,
};
