const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM moviedetails where Genre like ('War') or Genre like('war')`,
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
       // console.log(results);
        if ((results.length == 0)) {
          res.status(404).json({ messgae: "war movie not found" });
        } else {
          res.status(200).json(results);
        }
      }
    }
  );
});

module.exports = router;
