var express = require('express');
const multer = require("multer");
var cors = require('cors');
require('dotenv').config();

const upload = multer({dest: "uploads/" });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ============================MY CODE===============================
// Handle file uploads
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  // console.log(req.file, req.body)
  // Retrieve the uploaded file details
  const { originalname, mimetype, size } = req.file;

  // Rspond with JSON containing file information
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});
// ==================================================================

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
