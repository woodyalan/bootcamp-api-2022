const { Router } = require("express");
const router = Router();
const { criar } = require("../controle/nota");

router.get("/:id?", (req, res) => {
  const { id } = req.params;
  res.send("Notas GET " + id);
});

router.post("/", async (req, res) => {
  const { body } = req;

  const nota = await criar(body);

  res.send("Nota POST");
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
