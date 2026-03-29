const express = require("express");
const app = express();
const door = 8080;
const user = require("./models/users");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Página Inicial ");
});

app.post("/singup", async (req, res) => {
  console.log(req.body);

  await user.create(req.body)
    .then(() => {
      return res.json({
        erro: false,
        mensagem: "Cadastrou com sucesso"
      });
    }).catch((err) => {
        return res.status(400).json({
          erro: true,
          mensagem: "Não cadastrou com sucesso: " + err
      });
    });

  // res.send("Pagina Cadastrar");
});

app.listen(door, () => {
  console.log("Servidor Iniciado na porta " + door);
});
