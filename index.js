const express = require("express");
const app = express();
const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");

app.use(express.json());

app.get("/inicio", function (req, res) {
  res.send("Olá!");
});

app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(3000, function () {
  console.log("Aplicação rodando");
});
