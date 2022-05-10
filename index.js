const express = require("express");
const app = express();
const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");
const login = require("./rotas/login");

app.use(express.json());

app.use("/login", login);
app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(3000, () => {
  console.log("Aplicação rodando");
});
