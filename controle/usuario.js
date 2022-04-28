const { usuario } = require("../bd");

const criar = () => {
  return usuario.create();
};

module.exports = { criar };
