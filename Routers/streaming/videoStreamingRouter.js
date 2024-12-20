const express = require("express");
const Router = express.Router();
const fs = require('fs');
const path = require("path");


Router.get("/:moviename", (req, res) => {
    const videoPath = path.join(__dirname, "..", "..", "CompressedMovieStock", req.params.moviename);
    const stat = fs.statSync(videoPath); // Get file size
    const fileSize = stat.size;




    // // Set the response headers to handle video streaming
    // res.writeHead(200, {
    //     "Content-Length": fileSize,
    //     "Content-Type": "video/mp4",
    // });

    // // Create a read stream to the video file and pipe it to the response
    // const videoStream = fs.createReadStream(videoPath);
    // videoStream.pipe(res);  // Pipe the video stream to the response

    // // Error handling for the video stream
    // videoStream.on('error', (err) => {
    //     res.status(500).send('Error streaming the video: ' + err.message);
    // });





    const range = req.headers.range; // Get 'Range' header from request
    if (range) {
      // Parse Range
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10); // Start byte
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1; // End byte

      // Ensure range is valid
      if (start >= fileSize || end >= fileSize) {
        res.status(416).send("Requested Range Not Satisfiable");
        return;
      }

      const chunkSize = end - start + 1; // Calculate chunk size
      const file = fs.createReadStream(videoPath, { start, end }); // Stream the chunk

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      });

      file.pipe(res); // Send chunk to the client
    } else {
      // No 'Range' header: Send the whole video
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });
      fs.createReadStream(videoPath).pipe(res);
    }
})

module.exports = Router;