const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require("dotenv");
const connection=require("../../utils/DB_connection.js")

dotenv.config();


console.log("db user");
console.log("|")
console.log("|")
console.log("\/")
console.log(process.env.DB_HOST)


router.get('/', (req, res) => {


  connection.query(
    `SELECT * FROM moviedetails where Genre like('%comedy%')`,
    (err, results) => {
      if (err) {
        res.status(500).json(err);
        console.log(err)
      } else {
        if ((results.length == 0)) {
          res.status(404).json({ messgae: "Comedy movie not found" });
          console.log('comedy movie not found');
        } else {
          res.status(200).json(results);
        }
      }
    })



});



module.exports = router;
