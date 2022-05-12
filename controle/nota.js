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

const buscar = async (usuarioId, id = null, transaction = null) => {
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
      where: { id, usuarioId },
      include,
      transaction,
    });
  } else {
    resultado = await nota.findAll({
      where: { usuarioId },
      include,
      transaction,
    });
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

const atualizar = async (id, titulo, descricao, checklists = []) => {
  const transaction = await conexao.transaction();

  try {
    await nota.update(
      {
        titulo,
        descricao,
      },
      {
        where: { id },
        transaction,
      }
    );

    if (checklists && checklists.length > 0) {
      for (const item of checklists) {
        if (item.id) {
          await checklist.update(
            {
              descricao: item.descricao,
              concluida: item.concluida,
            },
            {
              where: { id: item.id },
              transaction,
            }
          );
        } else {
          await checklist.create(
            {
              notaId: id,
              descricao: item.descricao,
              concluida: item.concluida,
            },
            {
              transaction,
            }
          );
        }
      }
    }

    const notaAtualizada = await buscar(id, transaction);

    await transaction.commit();

    return notaAtualizada;
  } catch (erro) {
    await transaction.rollback();

    throw erro;
  }
};

module.exports = { criar, buscar, remover, atualizar };
