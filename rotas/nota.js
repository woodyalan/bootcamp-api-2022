const express = require("express");
const router = express.Router();

router.get("/:id?", function (req, res) {
  res.send("Notas GET " + req.params.id);
});

router.post("/", function (req, res) {
  console.log(req.body);

  res.send("Nota POST");
});

router.put("/:id", function (req, res) {
  console.log(req.params);
  console.log(req.body);

  res.send("Nota PUT");
});

router.delete("/", function (req, res) {
  res.send("Nota DELETE");
});

module.exports = router;
