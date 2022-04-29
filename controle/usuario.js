const { usuario } = require("../bd");

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
  const resultado = await usuario.findByPk(id);

  return resultado;
};

module.exports = { criar, atualizar };
