const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection=require("../../utils/DB_connection.js")



router.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM moviedetails where Genre like('%Action%')`,
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        //console.log(results);
        if ((results.length == 0)) {
          res.status(404).json({ messgae: "Action movie not found" });
        } else {
          res.status(200).json(results);
        }
      }
    }
  );
});

module.exports = router;
