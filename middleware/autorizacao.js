const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { secret } = require("../config/seguranca");

module.exports = [
  check("authorization")
    .not()
    .isEmpty()
    .withMessage("Token é obrigatório")
    .isJWT()
    .withMessage("Token precisa estar no formato JWT"),
  (req, res, next) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).send({ mensagem: erros });
    }

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(403).send({ mensagem: "Token não informado" });
    }

    try {
      const decoded = jwt.verify(authorization, secret);

      req.userId = decoded.id;

      next();
    } catch (erro) {
      return res.status(500).send({ mensagem: erro.message });
    }
  },
];
