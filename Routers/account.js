const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection=require("../utils/DB_connection.js")

dotenv.config()
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
router.get("/",(req, res) => {
    clientInfo(req,res);
  }
);


function clientInfo(req, res) {
    console.log("in clientAuthenticate middleware");
   // console.log(req.body);
    connection.query(
      `SELECT * FROM users where UserName='${req.session.passport.user.username}' `,
      async (err, results) => {
        if(err){
          console.log(err);
          res.status(500).json(err);
        }
        else
        if (results.length !== 0) {
          res.status(200).json(results[0]);
        } else {
          console.log("User does not exist");
          res.status(500).json({ status: 'Internal Server Error', message: 'error' });
        }
       
        //console.log('Query results:', results);
      }
    );
  
    // Close the connection when done
    //connection.end();
  }
  module.exports = router;