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
    console.error("Error connecting to database for Sci-fi:", err);
    return;
  }
  console.log("Connected to database for Sci-fi");
});

router.get("/", (req, res) => {
  connection.query(
    `SELECT Thumbnail,MovieName,MovieID FROM moviedetails where Genre like('%Sci-fi%')`,
    (err, results) => {
      if (err) {
        res.status(200).json(err);
      } else {
        console.log(results);
        if ((results.length == 0)) {
          res.json({messgae: "Sci-fi movie not found"});
        } else {
          res.status(500).json(results);
        }
      }
    }
  );
});

module.exports = router;
