#Weather App

It Dynamically fetches weather infromation data of any specified City in the World.
<br>
<br>
When a User enters a preffered City, the backend via a weather api, appends that city name at the end of it, if City name is valid, It goes ahead and grabs the weather infomation about the specified city, and sends that data back to a user.
<br>
<br>
NOTE BEFORE DOING ANYTHNG!!!
Copy paste the following in SQL Mysql commandline.
<br>
<br>
Below are two database tables that will be used to store weather information data.
<br>
<br>
cities, favoriteCity respectively.
<br>

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

Then <br>
cd into backend <br>
Open the terminal and run the following commands <br>
npm install <br>
npm run start <br>

Finally <br>
cd into frontend <br>
run index.html //you can open the file using any broswer, `it should work`, or using live server E.g. vscode.
