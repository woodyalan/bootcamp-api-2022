const jwt = require("jsonwebtoken");
const { secret } = require("../config/seguranca");

module.exports = (req, res, next) => {
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
};
