const { Router } = require("express");
const router = Router();

router.get("/:id?", (req, res) => {
  const { id } = req.params;
  res.send("Notas GET " + id);
});

router.post("/", (req, res) => {
  const { body } = req;
  console.log(body);

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
