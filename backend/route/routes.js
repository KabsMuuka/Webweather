const express = require("express");
const route = express.Router();

//imported from controller.js
const {
  postCityName,
  postFavCity,
  getCities,
  getFavoriteCity,
  deleteCity,
  deleteFavoriteCity,
} = require("../controller/controller");

//defines each route path
route.post("/api/weather", postCityName);
route.post("/favoriteCity", postFavCity);
route.get("/cities", getCities);
route.get("/favoriteCity", getFavoriteCity);
route.delete("/deleteFromAllCities", deleteCity);
route.delete("/deleteFromFavoriteCity", deleteFavoriteCity);

module.exports = route;
