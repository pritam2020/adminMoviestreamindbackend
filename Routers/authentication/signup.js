const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
dotenv.config()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  router.post("/",bodyParser.json(), (req, res) => {
    console.log(req.body.Username);
    createUser(req.body.Username, req.body.Password, req.body.FirstName, req.body.LastName, req.body.EmailId, req, res);
  
  });


  async function createUser(username, password, FirstName, LastName, Email, req, res) {
    console.log(username + "..this is from function");
    console.log(password + "..this is from function");
    console.log(Email + "..this is from function");
  
    try {
      // Generate a salt (a random string) to add to the password
      const saltRounds = 10; // You can adjust this value for more or less security
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword);
  
      // Insert the user into the database
      const sqlQuery = 'INSERT INTO users (Username, Password_Hash, FirstName, LastName, EmailId) VALUES (?, ?, ?, ?, ? )';
      connection.query(sqlQuery, [username, hashedPassword, FirstName, LastName, Email], (err, result) => {
        if (err) {
          console.error("Error inserting user into DB:", err);
          res.status(500).json({ message: "Error inserting user into DB", status: err });
          //throw err;
        } else {
          console.log("User created successfully in DB...");
          console.log(result);
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