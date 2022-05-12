const { Router } = require("express");
const router = Router();
const { criar } = require("../controle/usuario");

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuario = await criar(nome, email, senha);

  res.send(usuario);
});

module.exports = router;
