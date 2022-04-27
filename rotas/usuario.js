const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send("Nota GET");
});

router.post("/", (req, res) => {
  console.log(req.body);

  res.send("Usuário POST");
});

router.put("/", (req, res) => {
  console.log(req.body);

  res.send("Usuário PUT");
});

router.delete("/", (req, res) => {
  res.send("Usuário DELETE");
});

module.exports = router;