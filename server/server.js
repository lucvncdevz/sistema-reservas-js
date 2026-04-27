const express = require("express");
const cors = require("cors");
const app = express();
const door = 33300;
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
  try {
    const dados = req.body;

    // 1. Criptografa a senha
    dados.password = await bcrypt.hash(dados.password, 8);

    // 2. Cria o usuário apenas UMA vez
    const newUser = await user.create(dados);

    // 3. Gera o token
    const token = jstoken.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf,
      },
      "UserIsLoggedIn",
      { expiresIn: "1h" }
    );

    // 4. Retorna o sucesso
    return res.json({
      erro: false,
      user: {
        id: newUser.id,
        nome: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf,
      },
      token: token,
    });
  } catch (err) {
    // Caso ocorra erro (ex: e-mail já cadastrado)
    return res.status(400).json({
      erro: true,
      mensagem: "Não cadastrou com sucesso: " + err.message,
    });
  }
});

// ==========================================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = await user.findOne({ where: { email: email } });

  if (!usuario)
    return res
      .status(400)
      .json({ erro: true, mensagem: "Usuário não encontrado" });

  const senhaValida = await bcrypt.compare(password, usuario.password);
  if (!senhaValida)
    return res.status(400).json({ erro: true, mensagem: "Senha incorreta" });

  // GERAR O TOKEN
  const token = jstoken.sign(
    { id: usuario.id, email: usuario.email },
    "UserIsLoggedIn", // Use a mesma chave que usou no singup
    { expiresIn: "1h" }
  );

  return res.json({
    erro: false,
    user: { id: usuario.id, nome: usuario.name, email: usuario.email, cpf: usuario.cpf },
    token: token, // Agora o frontend recebe o token no login
  });
});

// ==========================================

app.put("/update-data-user", async (req, res) => {});

// ==========================================

app.get("/validar-acesso", validarToken, async (req, res) => {
  // Se o middleware 'validarToken' deixar passar, chegamos aqui.
  // req.userId geralmente é definido dentro do seu middleware de auth.
  return res.json({
    erro: false,
    // mensagem: "Token válido!",
    idUsuario: req.userId,
  });
});

// ==========================================

app.listen(door, () => {
  console.log(`Servidor rodando em http://localhost:${door}`);
});
