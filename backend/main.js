var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var pg = require("pg");
var app = express();
var User = require("./models/user");
var multer = require("multer");
const path = require('path');
const fs = require('fs');
const router = express.Router();

const DIR = './uploads';


app.use(cors());
app.use(bodyParser.json());

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});




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
  console.log("backend baglantısı oldu mu" + user);

  client.query(
    "INSERT INTO t_uye_test2(isim,parola,ipucu,cevap,uyelik_turu,cep_tel,sirket_isim,sicil_belgesi) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [
      user.username,
      user.password,
      user.hint,
      user.answerhint,
      user.typeMemberId,
      user.mobilephone,
      user.foundationName,
      user.ceretificateOfRegistration
    ],
    function(err, result) {
      if (err) {
        console.log(err.stack);
        return res.send(err);
      } else {
        console.log(res);
        console.log("kaydedildi");
        return res.status(201).send("ok");
      }
    }
  );
});
app.post('/upload',upload.single('photo'), function (req, res) {
 
  if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false
      });
  
    } else {
      console.log('file received');
      return res.send({
        success: true
      })
    }
});
app.listen(8080, function() {
  console.log("Port dinleniyor 8080...");
});
