const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const { criar, atualizar, buscar, remover } = require("../controle/usuario");

router.get("/", async (req, res) => {
  // const { id } = req.params;
  const { userId } = req;

  const resultado = await buscar(userId);

  res.send(resultado);
});

router.post("/", check("nome").trim(), async (req, res) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) return res.status(400).send({ mensagem: erros });

  const { nome, email, senha } = req.body;

  const usuario = await criar(nome, email, senha);

  res.send(usuario);
});

router.put("/", async (req, res) => {
  const { nome, senha } = req.body;
  const id = req.userId;

  const usuario = await atualizar(id, nome, senha);

  res.send(usuario);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await remover(id);

  res.send();
});

module.exports = router;
