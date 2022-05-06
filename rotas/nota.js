const { Router } = require("express");
const router = Router();
const { criar, buscar } = require("../controle/nota");

router.get("/:id?", async (req, res) => {
  const { id } = req.params;

  const resultado = await buscar(id);

  res.send(resultado);
});

router.post("/", async (req, res) => {
  const { body } = req;

  const nota = await criar(body);

  res.send(nota);
});

router.put("/:id", (req, res) => {
  const { id } = req.params.id;

  console.log(id);

  res.send("Nota PUT");
});

router.delete("/", (req, res) => {
  res.send("Nota DELETE");
});

module.exports = router;
