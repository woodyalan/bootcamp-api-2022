const { Router } = require("express");
const router = Router();
const { login } = require("../controle/usuario");

router.post("/", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const token = await login(email, senha);

    if (token) {
      res.send({ token });
    } else {
      res.status(401).send({ mensagem: "Credenciais inválidas" });
    }
  } catch (erro) {
    console.log(erro);
    res.status(500).send({ mensagem: erro.mensagem });
  }
});

module.exports = router;
