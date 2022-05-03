const { Router } = require("express");
const router = Router();
const { criar, atualizar, buscar, remover } = require("../controle/usuario");

router.get("/:id?", async (req, res) => {
  const { id } = req.params;

  const resultado = await buscar(id);

  res.send(resultado);
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await remover(id);

  res.send();
});

module.exports = router;
