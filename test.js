const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const app = express();
const PORT = 3002;

app.use(session({
    secret: 'your_secret_key', // Secret used to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
  }));
  app.listen(PORT, () => {
    console.log(`node server is running on port : ${PORT}....`);
  });
  app.use('/protected-route', (req, res, next) => {
    if (!req.session.user) {
      console.log("session..."+req.session.user);
      return res.status(401).end('You must be logged in to access this resource');
    }
    console.log("session..."+req.session);
    console.log("session..."+req.session.user.username);
    next();
  })
  app.get('/protected-route/getall',()=>{
    
  })  