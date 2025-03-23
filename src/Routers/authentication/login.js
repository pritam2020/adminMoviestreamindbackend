const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const connection = require("../../utils/DB_connection.js");
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const dotenvExpand = require('dotenv-expand');

const env=dotenv.config();
dotenvExpand.expand(env);

passport.use(new LocalStrategy((username, password, cb) => {
  console.log("username: "+username);
  console.log("password: "+password);
  console.log("redirect-url: "+process.env.REACT_HOME);
  connection.query(
    `SELECT * FROM users where UserName='${username}' `,
    async (err, results) => {
      const user = results[0];
      if (err) {
        console.log(err);
        cb(err, false);
      }
      else if (user) {
        const isMatch = await bcrypt.compare(password, user.Password_Hash);
        if (isMatch) {
          console.log("user exists and password matches");
          cb(null, user);
        } else {
          console.log("user exists but Password does not match");
          cb(null, false);
        }
      } else {
        console.log("User does not exist");
        cb(null, false);
      }

    }
  );

}));


passport.serializeUser((user, cb) => {
  cb(null, { username: user.UserName });
});

passport.deserializeUser((user, cb) => {
  
  cb(null, user);
});

router.post("/", bodyParser.json(), passport.authenticate('local'), (req, res) => {
  //console.log("request-details: "+req.body);
  console.log(" client success");
  //console.log(process.env.SERVER);
  res.status(200).json({
    message: 'login success',
    status: 'success'
  });
}
);



module.exports = router;
