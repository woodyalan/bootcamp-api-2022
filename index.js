const express = require("express");
const morgan = require("morgan");
const app = express();
const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");
const login = require("./rotas/login");
const cadastro = require("./rotas/cadastro");
const autorizacao = require("./middleware/autorizacao");

app.use(express.json());
app.use(morgan("dev"));

app.use("/login", login);
app.use("/cadastro", cadastro);
app.use(autorizacao);
app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(3000, () => {
  console.log("Aplicação rodando");
});
