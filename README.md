#Weather App

It Dynamically fetches weather data of any specified City in the World.

When a User enters a preffered City, the backend gets a weather api and append a city name at the end. If City Name is valid, It goes ahead and send that data back to the User or Client.

NOTE BEFORE DOING ANYTHNG
Copy paste the following in Mysql commandline

CREATE DATABASE weatherApp;
USE weatherApp;

CREATE TABLE cities(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(256) NOT NULL,
region VARCHAR(256) NOT NULL,
country VARCHAR(256) NOT NULL,
`localtime` DATETIME NOT NULL,
temp_C DECIMAL(5, 2) NOT NULL,
`text` VARCHAR(256) NOT NULL  
);

CREATE TABLE favoriteCity(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(256) NOT NULL,
region VARCHAR(256) NOT NULL,
country VARCHAR(256) NOT NULL,
`localtime` DATETIME NOT NULL,
temp_C DECIMAL(5, 2) NOT NULL,
`text` VARCHAR(256) NOT NULL  
);

Then
cd into backend
1.npm install
2.npm run start //http://localhost:3000

Then
cd into frontend
run index.html
