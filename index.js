
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const session = require("express-session");
const app = express();
const cors = require("cors");
const PORT = 3002;
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mysql = require("mysql2");


dotenv.config();
var count = 0;




const MovieStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory where the uploaded file should be stored
    console.log("in multer");
    console.log(file);

    if (file.fieldname == "video") {
      cb(null, "./VideoGallery/");
    } else if (file.fieldname == "nail") {
      cb(null, "./Thumbnails/");
    }

    // 'uploads/' is the destination directory in this example
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, file.originalname);
  },
});
const MovieDestnitation = multer({ storage: MovieStorage });

const ThumbnailStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, "./Thumbnails/");
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  },
});
const ThumbnailDestnitation = multer({ storage: ThumbnailStorage });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



app.set("view engine, ejs");



// -------------------------------------Middlewares-------------------------------------


app.use(require("express-status-monitor")());
app.use(cors());
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,

})
);
app.use("/protected-route", (req, res, next) => {
  if (!req.session.user) {

    return res.status(401).end("You must be logged in to access this resource");
  }

  next();
});
app.use("/protected-route/views/", express.static(path.join(__dirname, "Views")));
app.use("/protected-route/videos", express.static(path.join(__dirname, "VideoGallery")));
app.use("/protected-route/images", express.static(path.join(__dirname, "resources")));
app.use("/protected-route/thumbnails", express.static(path.join(__dirname, "Thumbnails")));


app.listen(PORT, () => {
  console.log(`node server is running on port : ${PORT}....`);
});


// ---------------------------------------------------------------------routes----------------------------------------------------





app.get("/protected-route/clientdelete", (req, res) => {
  req.session.user.username = "";

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: `error logging-out`, status: 'error' });
    } else {
      console.log("logged out successfully");
      res.status(200).json({ message: 'successfully logged out', status: 'success' });
    }
  });
});
app.get("/", (req, res) => {
  fs.readFile("./Views/AdminLogin.html", (err, data) => {
    if (!err) {
      console.log(process.env.SERVER);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    } else console.log(err);
  });
});
app.post("/adminlogin", bodyParser.urlencoded({ extended: true }), adminAuthenticate, (req, res) => {
  console.log(req.body);
  console.log("success");
  console.log(process.env.SERVER);
  //fs.readFile('./Views/console/VideoGallery.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); });
  res.redirect(
    `http://${process.env.SERVER}:${process.env.PORT}/protected-route/views/console/html/VideoGallery.html`
  );
}
);
app.get("/protected-route/videodetails", (req, res) => {
  connection.query("select * from moviedetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var tabs = result;
      // console.log("length of result..." + tabs.length);
      // console.log(tabs);
      // console.log("result after fetching movie details..." + result);
      const data = {
        tabs: Math.ceil(result.length / 50),
        result: result,
      };
      res.end(JSON.stringify(data));
    }
  });
});
app.post("/protected-route/Upload", bodyParser.urlencoded({ extended: true }), MovieDestnitation.fields([{ name: "video", maxCount: 1 }, { name: "nail", maxCount: 1 },]), (req, res) => {
  console.log("file uploaded...");
  // console.log(req)
  console.log(req.file);
  console.log(req.files);
  // console.log(req.body);
  const description = "blahh blah blah..." + count;
  const MovieID = generateMovieID();
  var genre;
  var cname;
  var dname;
  if (Array.isArray(req.body.genre)) {
    genre = req.body.genre.join();
  } else {
    genre = req.body.genre;
  }
  if (Array.isArray(req.body.dname)) {
    dname = req.body.dname.join();
  } else {
    dname = req.body.dname;
  }
  if (Array.isArray(req.body.cname)) {
    cname = req.body.cname.join();
  } else {
    cname = req.body.cname;
  }
  // console.log(genre);
  // console.log(cname);
  // console.log(dname);
  var SqlQuery = "insert into moviedetails values (?,?,?,?,?,?,?,?,?,?)";
  //  const fileNames = req.files.map((file) => { file.originalname; connection.query(`insert into moviedetails values(${generateMovieID()},'${file.originalname}','${description + count++}')`, (err, result) => { if (!err) { res.sendFile(path.join(__dirname, 'Views', 'console', 'UploadVideo.html')); console.log("movie details uploadede is db..."); console.log(result); } else { console.log(err); } }); });
  //console.log('Uploaded file names:', fileNames);
  // console.log(req);
  connection.query(
    SqlQuery,
    [
      MovieID,
      req.files.video[0].originalname,
      req.body.description,
      genre,
      req.body.language,
      req.body.Olanguage,
      req.body.rating,
      cname,
      dname,
      req.body.rdate,
    ],
    (err, result, fields) => {
      if (!err) {
        res.redirect("./views/console/html/UploadVideo.html");
        console.log("movie details uploadede is db...");
        console.log(result);
      } else {
        console.log(err);
      }
    }
  );
}
);
app.get("/protected-route/deletemovie", (req, res) => {
  console.log(req.query.MovieID);
  const filePath = path.join(
    __dirname,
    "VideoGallery",
    req.query.MovieName + ".mp4"
  );
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file from storage ...:", err);
      return;
    }
    console.log("File deleted successfully from storage...");
    connection.query(
      `delete from moviedetails where MovieID=${req.query.MovieID}`,
      (err, result) => {
        if (err) {
          console.log("err in delete  sql..." + err);
        } else {
          console.log("No error in delete sql...result: " + result);
        }
      }
    );
    //fs.readFile('./Views/console/VideoGallery.html', (err, data) => { if (!err) { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data); } else console.log(err); });
    res.redirect(
      `http://${process.env.SERVER}:${process.env.PORT}/protected-route/views/console/html/videogallery.html`
    );
  });
});
app.get("/protected-route/logout", (req, res) => {
  req.session.user.username = "";

  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error logging out");
    } else {
      console.log("logged out successfully");
      res.redirect(`http://${process.env.SERVER}:${process.env.PORT}/`);
    }
  });
});



// -----------------------------------------------------functions ----------------------------------------------------

function adminAuthenticate(req, res, next) {
  console.log("in adminAuthenticate middleware");
  console.log(req.body);
  connection.query(
    `SELECT * FROM admin where UserName='${req.body.username}' and Password_Hash='${req.body.password}' `,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ message: 'error while inserting data in DB' });
        return;
      } else {
        if (results.length != 0 && results[0].UserName == req.body.username && results[0].Password_Hash == req.body.password) {
          req.session.user = { username: req.body.username };
          console.log(results);
          next();
        } else {
          console.log("admin User dosenot exists..." + results);
          res.status(401).json({ status: 'Unauthorized', message: 'user dose not exists' });
        }
      }
      //console.log('Query results:', results);
    }
  );

  // Close the connection when done
  //connection.end();
}
function generateMovieID() {
  const length = 10;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
// ------------------------------------------------------tests ----------------------------------------------------------------
app.get("/new/test/:testID/:movieName", (req, res) => {
  console.log(req.params.testID);
  res.end("req-param : " + req.params.testID + "," + req.params.movieName);
});
app.get("/new/test", (req, res) => {
  console.log(req.params.testID);
  res.end("query-param : " + req.query.testID + "," + req.query.movieName);
});
