const express = require("express");
const cors = require("cors");
const app = express();
const door = 33300;
const user = require("./models/users");
const path = require("path");
const bcrypt = require("bcryptjs");
const jstoken = require("jsonwebtoken");
const validarToken = require("./middlewares/auth");

const helmet = require("helmet");

// Exemplo com Express e Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'"], // Permite a tag <script>
      "script-src-attr": ["'unsafe-inline'"],      // Permite o onclick=""
      "connect-src": ["'self'", "http://localhost:33300"],
    },
  })
);

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

    dados.password = await bcrypt.hash(dados.password, 8);

    const newUser = await user.create(dados);

    const token = jstoken.sign(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf,
      },
      "UserIsLoggedIn",
      { expiresIn: "1h" },
    );

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
    return res.status(400).json({
      erro: true,
      mensagem: "Não cadastrou com sucesso: " + err.message,
    });
  }
});

// ==========================================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        erro: true,
        mensagem: "Preencha todos os campos para logar.",
      });
    }

    const usuario = await user.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!usuario) {
      return res.status(400).json({
        erro: true,
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (!senhaValida) {
      return res.status(400).json({
        erro: true,
        mensagem: "E-mail ou senha inválidos.",
      });
    }

    const token = jstoken.sign(
      { id: usuario.id, email: usuario.email },
      "UserIsLoggedIn",
      { expiresIn: "1h" },
    );

    return res.json({
      erro: false,
      mensagem: "Login realizado com sucesso!",
      user: {
        id: usuario.id,
        nome: usuario.name,
        email: usuario.email,
        cpf: usuario.cpf,
      },
      token,
    });
  } catch (error) {
    console.error("Erro interno no login:", error);
    return res.status(500).json({
      erro: true,
      mensagem: "Ocorreu um erro no servidor ao tentar logar.",
    });
  }
});

// ==========================================

app.put("/update-data-user", validarToken, async (req, res) => {
  const { id, name, email, cpf } = req.body;

  if (!id || !name || !email || !cpf) {
    return res.status(400).json({
      erro: true,
      mensagem: "Preencha todos os campos para atualizar os dados.",
    });
  }

  const updatedUser = await user.update(
    { name, email, cpf },
    { where: { id } },
  );

  return res.json({
    erro: false,
    mensagem: "Dados atualizados com sucesso!",
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      cpf: updatedUser.cpf,
    },
  });
});

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
