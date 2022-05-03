const express = require("express");
const app = express();
const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");

app.use(express.json());

app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(3000, () => {
  console.log("Aplicação rodando");
});
