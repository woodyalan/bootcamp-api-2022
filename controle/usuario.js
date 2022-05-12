const { usuario } = require("../bd");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secret } = require("../config/seguranca");

const criar = async (nome, email, senha) => {
  let [created] = await usuario.findOrCreate({
    defaults: {
      nome: nome,
      email: email,
      senha: senha,
    },
    where: {
      email: email,
    },
  });

  return created;
};

const atualizar = async (id, nome, senha) => {
  await usuario.update(
    {
      nome: nome,
      senha: senha,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return await buscar(id);
};

const buscar = async (id) => {
  const resultado = await usuario.findByPk(id);

  return resultado;
};

const remover = async (id) => {
  await usuario.destroy({
    where: {
      id,
    },
  });
};

const login = async (email, senha) => {
  try {
    const user = await usuario.scope("login").findOne({
      where: { email: email },
    });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) return false;

    return jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });
  } catch (erro) {
    throw erro;
  }
};

module.exports = { criar, atualizar, buscar, remover, login };
