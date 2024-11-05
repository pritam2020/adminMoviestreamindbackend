const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
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
router.get("/", (req, res) => {
    console.log(req.query.SearchQuery.replace(/\s/g, ""));
    connection.query(`select * from moviedetails where REPLACE(Genre," ","") LIKE ? OR REPLACE(MovieName," ","") LIKE ? OR REPLACE(cast," ","") LIKE ? OR REPLACE(Directors," ","") LIKE ?`, 
    [`%${req.query.SearchQuery.replace(/\s/g, "")}%`, `%${req.query.SearchQuery.replace(/\s/g, "")}%`, `%${req.query.SearchQuery.replace(/\s/g, "")}%`, `%${req.query.SearchQuery.replace(/\s/g, "")}%`], (err, results) => {
        if (!err) {
            //console.log("succes in getting Search results")
            res.status(200).json(results);
        } else {
            console.log(err);
            res.status(500).json({ status: "error", message: "erroe while getting results from DB" });
        }
    });
}
);



module.exports = router;