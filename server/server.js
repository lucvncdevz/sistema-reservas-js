const express = require("express");
const cors = require("cors");
const app = express();
const door = 8080;
const user = require("./models/users");
const path = require("path");
const bcrypt = require("bcryptjs");
const jstoken = require("jsonwebtoken");
const validarToken = require("./middlewares/auth");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client")));

// ==========================================
// REGISTRO DE ROTAS
// ==========================================

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "html", "index.html"));
  // path.join (/ Windows  \Linux),  __dirname variavel reservada - ela recebe a localização do arquivo(html, imagens, ou qualquer coisa do tipo) que eu quero abrir
});

// ==========================================

app.post("/singup", async (req, res) => {
  const dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);
  const newUser = await user.create(dados);

  const token = jstoken.sign({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    cpf: newUser.cpf
  }, "UserIsLoggedIn", {expiresIn: "1h"});

  user.create(dados).then(() => {
      return res.json({
        erro: false, 
        user: 
        {
          id: newUser.id, 
          nome: newUser.name, 
          email: newUser.email, 
          cpf: newUser.cpf
        },
      token: token,
      });
      })
    .catch((err) => {
      return res.status(400).json({
        erro: true, 
        mensagem: "Não cadastrou com sucesso: " + err
      });
    });
  // res.send("Pagina Cadastrar");
});

// ==========================================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await user.findOne({where: { email: email }});
  const senhaValida = await bcrypt.compare(password, usuario.password);

  if (!usuario) {return res.status(400).json({erro: true, user: false})}
  if (!senhaValida) {return res.status(400).json({erro: true,password: false})}

  return res.json({
    erro: false, 
    user:{
      id: usuario.id, 
      nome: usuario.name, 
      email: usuario.email, 
      cpf: usuario.cpf
    },

  });
});

  app.put("/update-data-user", async (req, res) => {

  })


app.listen(door, () => {
  console.log(`Servidor rodando em http://localhost:${door}`);
});
