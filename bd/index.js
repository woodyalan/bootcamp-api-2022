const { Sequelize, DataTypes } = require("sequelize");
const options = require("../config/bd");
const _usuario = require("./auto/usuario");
const _nota = require("./auto/nota");
const _checklist = require("./auto/checklist");

const conexao = new Sequelize(options);
conexao
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((erro) => {
    console.log("Falha ao conectar ao banco de dados: " + erro.message);
  });

const usuario = _usuario(conexao, DataTypes);
const nota = _nota(conexao, DataTypes);
const checklist = _checklist(conexao, DataTypes);

nota.hasMany(checklist, { as: "checklists", foreignKey: "notaId" });
nota.belongTo(usuario, { as: "usuario", foreignKey: "usuarioId" });

module.exports = { conexao, usuario, nota, checklist };
