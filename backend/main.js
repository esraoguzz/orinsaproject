var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var pg = require("pg");
var app = express();
var User = require("./models/user");
var multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const DIR1 = "./uploads/sicil_levhalari";
const DIR2 = "./uploads/vergi_levhalari";
let sicilLevhasiName;
let vergiLevhasiName;

app.use(cors());
app.use(bodyParser.json());
let storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR1);
  },
  filename: (req, file1, cb) => {
    sicilLevhasiName = file1.originalname;

    cb(
      null,
      file1.fieldname + "-" + Date.now() + "." + path.extname(file1.originalname)
    );
  }
});
let upload1 = multer({ storage: storage1 });

let storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR2);
  },
  filename: (req, file2, cb) => {
    vergiLevhasiName = file2.originalname;
    cb(
      null,
      file2.fieldname + "-" + Date.now() + "." + path.extname(file2.originalname)
    );
  }
});
let upload2 = multer({ storage: storage2 });

var client = new pg.Client(
  "postgres://vhdojrrs:Vp_gjYuGNEvzYm7tajDIJzrllPoe3Ez3@baasu.db.elephantsql.com:5432/vhdojrrs"
);
client.connect(function(err) {
  if (err) {
    return console.error("Bağlantı sırasında hata oluştu : ", err);
  }
});

app.post("/createUser", (req, res) => {
  var user = new User(req.body);
  user.certificateOfRegistration = sicilLevhasiName;
  user.taxPlate = vergiLevhasiName;
  console.log("taxPlate****" + user.taxPlate);
  console.log("certificateOfRegistration*****" + user.certificateOfRegistration);

  console.log("backend baglantısı oldu mu" + user);

  client.query(
    "INSERT INTO t_uye_test2(isim,parola,ipucu,cevap,uyelik_turu,cep_tel,sirket_isim,sicil_belgesi,vergi_levhasi) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
    [
      user.username,
      user.password,
      user.hint,
      user.answerhint,
      user.typeMemberId,
      user.mobilephone,
      user.foundationName,
      user.certificateOfRegistration,
      user.taxPlate
    ],
    function(err, result) {
      if (err) {
        console.log(err.stack);
        return res.send(err);
      } else {
        console.log("kaydedildi");
        return res.status(201).send("ok");
      }
    }
  );

});
app.post("/upload/sicilLevhasi", upload1.single("photo"), function(
  req,
  res
) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log("file received");
    return res.send({
      success: true
    });
  }
});
app.post("/upload/vergiLevhasi", upload2.single("photo"), function(
  req,
  res
) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log("file received");
    return res.send({
      success: true
    });
  }
});
app.listen(8080, function() {
  console.log("Port dinleniyor 8080...");
});
