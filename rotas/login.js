const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const router = Router();
const { login } = require("../controle/usuario");

router.post(
  "/",
  body("email").isEmail().not().isEmpty(),
  body("senha").isLength({ min: 5 }),
  async (req, res) => {
    try {
      const erros = validationResult(req);

      if (!erros.isEmpty()) {
        return res.status(400).send({ mensagem: erros.array() });
      }

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
  }
);

module.exports = router;
