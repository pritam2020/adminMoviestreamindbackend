const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection=require("../../utils/DB_connection.js")

dotenv.config()

router.post("/",bodyParser.json(),clientAuthenticate,(req, res) => {
    //console.log("request-details: "+req.body);
    console.log(" client success");
    //console.log(process.env.SERVER);
    res.status(200).json({
      message: 'login success',
      status: 'success'
    });
  }
);


function clientAuthenticate(req, res, next) {
    
    connection.query(
      `SELECT * FROM users where UserName='${req.body.username}' `,
      async (err, results) => {
        if(err){
          console.log(err);
          res.status(500).json(err);
        }
        else if (results.length !== 0) {
          const isMatch = await bcrypt.compare(req.body.password, results[0].Password_Hash);
          if (isMatch) {
            req.session.user = { username: req.body.username };
           // console.log("request-session-user :",req.session)
            next();
          } else {
            console.log("Password does not match");
            res.status(401).json({ status: 'Unauthorized', message: 'Password does not match' });
          }
        } else {
          console.log("User does not exist");
          res.status(401).json({ status: 'Unauthorized', message: 'User does not exist' });
        }
       
      }
    );
  
   
  }
  module.exports = router;
