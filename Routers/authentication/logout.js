const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection=require("../../utils/DB_connection.js")

dotenv.config()

  router.get("/", (req, res) => {
    req.session.passport.user.username = "";
  
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