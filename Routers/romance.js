const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database for Romance:", err);
    return;
  }
  console.log("Connected to database for Romance");
});

router.get("/", (req, res) => {
  connection.query(
    `SELECT Thumbnail,MovieName,MovieID FROM moviedetails where Genre like('%Romance%')`,
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(results);
        if ((results.length == 0)) {
          res.status(404).json({messgae: "Romance movie not found"});
        } else {
    res.status(200).json(results);
        }
      }
    }
  );
});

module.exports = router;
