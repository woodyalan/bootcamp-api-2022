const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Nota GET");
});

router.post("/", function (req, res) {
  console.log(req.body);

  res.send("Usuário POST");
});

router.put("/", function (req, res) {
  console.log(req.body);

  res.send("Usuário PUT");
});

router.delete("/", function (req, res) {
  res.send("Usuário DELETE");
});

module.exports = router;
