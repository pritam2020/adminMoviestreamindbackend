const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection=require("../../utils/DB_connection.js")

dotenv.config()

  router.post("/",bodyParser.json(), (req, res) => {
    createUser(req.body.Username, req.body.Password, req.body.FirstName, req.body.LastName, req.body.EmailId, req.body.Country, req.body.Pincode, req.body.City, req, res);
  
  });


  async function createUser(username, password, FirstName, LastName, Email, Country, PinCode, City, req, res) {
    console.log("username: ",username);
    console.log("password: ",password);
    console.log("FirstName: ",FirstName);
    console.log("LastName: ",LastName);
    console.log("Email: ",Email),
    console.log("Country: ",Country),
    console.log("Pincode: ",PinCode);
    console.log("City: ",City);
  
    try {
      // Generate a salt (a random string) to add to the password
      const saltRounds = 10; // You can adjust this value for more or less security
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("hashed password: ",hashedPassword);
  
      // Insert the user into the database
      const sqlQuery = 'INSERT INTO users (Username, Password_Hash, FirstName, LastName, EmailId, County, PinCode, City) VALUES (?, ?, ?, ?, ?, ?, ?, ? )';
      connection.query(sqlQuery, [username, hashedPassword, FirstName, LastName, Email, Country, PinCode, City ], (err, result) => {
        if (err) {
          console.error("Error inserting user into DB:", err);
          res.status(500).json({ message: "Error inserting user into DB", status: err });
          //throw err;
        } else {
          console.log("User created successfully in DB...");
          console.log("response from DB: ",result);
          res.status(200).json({ message: 'user created successfully', status: 'success' });
        }
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user", status: `error` });
      // throw error;
    }
  }
  module.exports = router;