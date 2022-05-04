const { nota, checklist, conexao } = require("../bd");

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
  } catch (erro) {
    console.log(erro);
    await transacao.rollback();
  }
};

module.exports = { criar };
