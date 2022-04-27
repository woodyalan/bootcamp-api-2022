const express = require("express");
const app = express();
const usuario = require("./rotas/usuario");
const nota = require("./rotas/nota");
const { conexao } = require("./bd");

app.use(express.json());

app.get("/inicio", (req, res) => {
  const pessoa = {
    nome: "Alan",
    sobrenome: "Santos",
  };

  const { nome, sobrenome } = pessoa;

  console.log(nome, sobrenome);

  const numeros = [1, 2, 3];

  const [outroNumero, primeiroNumero] = numeros;

  console.log(primeiroNumero);

  res.send("Olá!");
});

app.use("/usuario", usuario);
app.use("/nota", nota);

app.listen(3000, () => {
  console.log("Aplicação rodando");
});
