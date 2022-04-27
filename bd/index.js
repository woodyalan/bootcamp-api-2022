const { Sequelize } = require("sequelize");

const options = {
  username: "admin",
  password: "notes123",
  database: "notes",
  host: "notes.cgssmrnlwpdu.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
};

const conexao = new Sequelize(options);
conexao
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((erro) => {
    console.log("Falha ao conectar ao banco de dados: " + erro.message);
  });

module.exports = { conexao };
