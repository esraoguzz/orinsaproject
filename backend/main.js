var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var pg = require("pg");
var app = express();
var User = require("./models/user");
var user = require("./services/userService");
app.use(cors());
app.use(bodyParser.json());

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
    "INSERT INTO t_uye_test(kullanici_id,parola,ipucu,cevap,uyelik_turu,cep_tel) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [
      user.username,
      user.password,
      user.hint,
      user.answerhint,
      user.typeMember,
      user.mobilephone
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

app.listen(8080, function() {
  console.log("Port dinleniyor 8080...ooooooo");
});
