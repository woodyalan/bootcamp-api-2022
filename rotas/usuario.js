const { Router } = require("express");
const router = Router();
const { criar, atualizar } = require("../controle/usuario");

router.get("/", (req, res) => {
  res.send("Nota GET");
});

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuario = await criar(nome, email, senha);

  res.send(usuario);
});

router.put("/:id", async (req, res) => {
  const { nome, senha } = req.body;
  const { id } = req.params;

  const usuario = await atualizar(id, nome, senha);

  res.send(usuario);
});

router.delete("/", (req, res) => {
  res.send("Usuário DELETE");
});

module.exports = router;
