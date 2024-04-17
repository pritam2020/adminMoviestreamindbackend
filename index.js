const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const app = express();
const PORT = 3002;

var count = 0;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory where the uploaded file should be stored
    cb(null, './VideoGallery/'); // 'uploads/' is the destination directory in this example
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

const destnitation = multer({ storage: storage })
const connection = mysql.createConnection({
  host: '192.168.29.245',
  port: 3306,
  user: 'root',
  password: 'Unique@18',
  database: 'moviestreaming'
});
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});


app.set("view engine, ejs");
app.use(session({
  secret: 'your_secret_key', // Secret used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  // cookie: { maxAge: 60000 }
}));



app.use('/protected-route', (req, res, next) => {
  if (!req.session.user) {
    console.log(req.session);
    console.log("session..."+req.session.user+'\n\n');
    return res.status(401).end('You must be logged in to access this resource');
  }
  console.log(req.session);
  console.log("session..."+req.session.user.username+'\n\n');
  next();
})
app.use('/protected-route/views', express.static(path.join(__dirname, 'Views', 'console')))
app.use('/protected-route/videos', express.static(path.join(__dirname, 'VideoGallery')));
app.use('/protected-route/images', express.static(path.join(__dirname, 'resources')));


app.listen(PORT, () => {
  console.log(`node server is running on port : ${PORT}....`);
});


app.get('/', (req, res) => {
  fs.readFile('./Views/AdminLogin.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); })
})



app.post('/adminlogin', bodyParser.urlencoded({ extended: true }), adminAuthenticate, (req, res) => {
  console.log('success');
  //fs.readFile('./Views/console/VideoGallery.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); });
  res.redirect('http://localhost:3002/protected-route/views/VideoGallery.html');
})



app.get('/protected-route/videodetails', (req, res) => {
  connection.query('select * from moviedetails', (err, result) => { if (err) { console.log(err); } else {  console.log("result after fetching movie details..."+result); res.end(JSON.stringify(result)) } })
})

app.post('/protected-route/Upload', destnitation.any('video'), (req, res) => {
  console.log("file uploaded...");
  const description = 'blahh blah blah...' + count;
  const fileNames = req.files.map((file) => { file.originalname; connection.query(`insert into moviedetails values(${generateMovieID()},'${file.originalname}','${description + count++}')`, (err, result) => { if (!err) { res.sendFile(path.join(__dirname, 'Views', 'console', 'UploadVideo.html')); console.log("movie details uploadede is db..."); console.log(result); } else { console.log(err); } }); });
  //console.log('Uploaded file names:', fileNames);
  console.log(req);
})






app.get('/protected-route/deletemovie', (req, res) => {
  console.log(req.query.MovieID);
  const filePath = path.join(__dirname,'VideoGallery',req.query.MovieName+'.mp4');
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file from storage ...:', err);
      return;
    }
    console.log('File deleted successfully from storage...');
    connection.query(`delete from moviedetails where MovieID=${req.query.MovieID}`, (err, result) => {
      if (err) {
        console.log('err in delete  sql...' + err);
      } else {
        console.log("No error in delete sql...result: " + result); 
  
      }
    }
    )
    //fs.readFile('./Views/console/VideoGallery.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); });
  res.redirect('http://localhost:3002/protected-route/views/videogallery.html');
  });
})







app.get('/protected-route/logout', (req, res) => { 
  req.session.user.username="";
  
  req.session.destroy((err) => { if (err) { console.log(err); res.status(500).send('Error logging out'); } else { console.log('logged out successfully'); res.redirect('http://localhost:3002/') } }) 
});

// app.get('/videogallery/video',(req,res)=>{
//   console.log('success');
//   const videopath=path.join(__dirname,'VideoGallery','one.mp4');
//   console.log("video path :"+videopath);
//   //fs.sendFile('././VideoGallery/one.mp4',(err,data)=>{if(!err){res.writeHead(200,{'Content-Type':'text/html'});}else console.log(err);});
//   res.sendFile(videopath);
// })



function adminAuthenticate(req, res, next) {
  console.log("in adminAuthenticate middleware");
  //console.log(req.body);
  // const connection = mysql.createConnection({
  //   host: '192.168.29.245',
  //   port: 3306,
  //   user: 'root',
  //   password: 'Unique@18',
  //   database: 'moviestreaming'
  // });
  // connection.connect((err) => {
  //   if (err) {
  //     console.error('Error connecting to database:', err);
  //     return;
  //   }
  //   console.log('Connected to database');
  // });
  connection.query(`SELECT * FROM admin where UserName='${req.body.username}' and Password_Hash='${req.body.password}' `, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    } else {
      if (results.length != 0) {

          req.session.user = {
          username: req.body.username,
        }
        next();
      }
      else { console.log("admin User dosenot exists..." + results); fs.readFile('./Views/UserDoseNotExists.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); }); }
    }
    //console.log('Query results:', results);

  });

  // Close the connection when done
  //connection.end();
}



function generateMovieID() {
  const length = 10;
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

