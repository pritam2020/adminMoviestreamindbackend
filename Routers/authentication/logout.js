const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
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
  router.get("/", (req, res) => {
    req.session.user.username = "";
  
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: `error logging-out`, status: 'error' });
      } else {
        console.log("logged out successfully");
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'successfully logged out', status: 'success' });
      }
    });
  });



  module.exports = router;