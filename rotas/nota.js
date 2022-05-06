const { Router } = require("express");
const router = Router();
const { criar, buscar, remover } = require("../controle/nota");

router.get("/:id?", async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await buscar(id);

    res.send(resultado);
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;

    const nota = await criar(body);

    res.send(nota);
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params.id;

  console.log(id);

  res.send("Nota PUT");
});

router.delete("/:id", async (req, res) => {
  try {
    await remover(req.params.id);

    res.send();
  } catch (erro) {
    res.status(500).send({ mensagem: erro.message });
  }
});

module.exports = router;
