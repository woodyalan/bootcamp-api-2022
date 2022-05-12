const { Router } = require("express");
const router = Router();
const { criar, buscar, remover, atualizar } = require("../controle/nota");

router.get("/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.userId;

    const resultado = await buscar(usuarioId, id);

    res.send(resultado);
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { body } = req;

    body = { ...body, usuarioId: req.userId };

    const nota = await criar(body);

    res.send(nota);
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { descricao, titulo, checklists } = req.body;
  const usuarioId = req.userId;

  try {
    const nota = await atualizar(id, usuarioId, titulo, descricao, checklists);

    res.send(nota);
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const usuarioId = req.userId;

    await remover(req.params.id, usuarioId);

    res.send();
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

module.exports = router;
