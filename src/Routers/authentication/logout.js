const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");


dotenv.config()

  router.get("/", (req, res) => {
    
    req.logOut((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: `error logging-out`, status: 'error' });
      } else {
        console.log("logged out successfully");
        res.status(200).json({ message: 'successfully logged out', status: 'success' });
      }
    });
  });



  module.exports = router;