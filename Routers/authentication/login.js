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
router.post("/",bodyParser.json(),clientAuthenticate,(req, res) => {
    console.log(req.body);
    console.log("success");
    console.log(process.env.SERVER);
    res.status(200).json({
      message: 'login success',
      status: 'success'
    });
  }
);


function clientAuthenticate(req, res, next) {
    console.log("in clientAuthenticate middleware");
    console.log(req.body);
    connection.query(
      `SELECT * FROM users where UserName='${req.body.username}' `,
      async (err, results) => {
        if (results.length !== 0) {
          const isMatch = await bcrypt.compare(req.body.password, results[0].Password_Hash);
          if (isMatch) {
            req.session.user = { username: req.body.username };
            console.log(results);
            next();
          } else {
            console.log("Password does not match");
            res.status(401).json({ status: 'Unauthorized', message: 'Password does not match' });
          }
        } else {
          console.log("User does not exist");
          res.status(401).json({ status: 'Unauthorized', message: 'User does not exist' });
        }
       
        //console.log('Query results:', results);
      }
    );
  
    // Close the connection when done
    //connection.end();
  }
  module.exports = router;