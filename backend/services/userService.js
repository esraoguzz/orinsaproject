var express = require("express");
var router = express.Router();
var User = require("../models/user");
var pg = require("pg");

var client = new pg.Client(
    "postgres://vhdojrrs:Vp_gjYuGNEvzYm7tajDIJzrllPoe3Ez3@baasu.db.elephantsql.com:5432/vhdojrrs"
  );
  client.connect(function(err) {
    if (err) {
      return console.error("Bağlantı sırasında hata oluştu : ", err);
    }
    
  });
router.post("/createUser", (req, res) => {
    
  var user = new User(req.body);

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
router.get("/getUsers", function(request, response) {
  client.query("select * from t_uye_test;", function(err, result) {
    if (err) {
      return console.error("Sorgu çalıştırılırken hata oluştu", err);
    }

    return response.send(JSON.stringify(result.rows));
  });
});
var user = {router}
module.exports = user