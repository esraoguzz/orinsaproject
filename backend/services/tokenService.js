const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome..."
  });
});
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, autData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        autData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {};
  jwt.sign(
    { user },
    "secretkey",
    {
      expiresIn: "30s"
    },
    (err, token) => {
      res.json({
        token
      });
    }
  );
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(8080, function() {
  console.log("Port dinleniyor 8080...");
});
