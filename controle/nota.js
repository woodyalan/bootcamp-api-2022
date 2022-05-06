const { nota, checklist, usuario, conexao } = require("../bd");

const criar = async ({ usuarioId, titulo, descricao, checklists }) => {
  const transacao = await conexao.transaction();

  try {
    const novaNota = await nota.create(
      {
        usuarioId,
        titulo,
        descricao,
      },
      {
        transaction: transacao,
      }
    );

    if (checklists && checklists.length > 0) {
      for (const item of checklists) {
        await checklist.create(
          {
            notaId: novaNota.id,
            descricao: item.descricao,
            concluida: item.concluida,
          },
          {
            transaction: transacao,
          }
        );
      }
    }

    await transacao.commit();

    return await buscar(novaNota.id);
  } catch (erro) {
    console.log(erro);
    await transacao.rollback();

    throw erro;
  }
};

const buscar = async (id = null) => {
  let resultado;

  let include = [
    {
      model: usuario,
      as: "usuario",
    },
    {
      model: checklist,
      as: "checklists",
    },
  ];

  if (id) {
    resultado = await nota.findOne({
      where: { id },
      include,
    });
  } else {
    resultado = await nota.findAll({ include });
  }

  return resultado;
};

const remover = async (id) => {
  const transaction = await conexao.transaction();

  try {
    await checklist.destroy({
      where: {
        notaId: id,
      },
      transaction,
    });

    await nota.destroy({ where: { id }, transaction });

    await transaction.commit();
  } catch (erro) {
    await transaction.rollback();

    throw erro;
  }
};

module.exports = { criar, buscar, remover };
