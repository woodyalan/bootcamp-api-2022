const { usuario } = require("../bd");
const jwt = require("jsonwebtoken");
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

const buscar = async (id = null) => {
  const resultado = id ? await usuario.findByPk(id) : await usuario.findAll();

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
    const user = await usuario.findOne({
      where: { email: email },
    });

    if (!user || senha !== user.senha) return false;

    return jwt.sign({ id: user.id }, secret, {
      expiresIn: "24h",
    });
  } catch (erro) {
    throw erro;
  }
};

module.exports = { criar, atualizar, buscar, remover, login };
