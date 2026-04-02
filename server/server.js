const express = require("express");
const cors = require("cors")
const app = express();
const door = 8080;
const user = require("./models/users");
const path = require('path');

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, '../client')));

// ==========================================
// REGISTRO DE ROTAS
// ========================================== 

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'))  
    // path.join (/ Windows  \Linux),  __dirname variavel reservada - ela recebe a localização do arquivo(html, imagens, ou qualquer coisa do tipo) que eu quero abrir    
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

app.post("/login", async (req, res) =>{
  const {email, password} = req.body;

  const usuario = await user.findOne({
  where: {email:email}  
  });
  
  if(!usuario){
    return res.status(400).json({
      erro: true,
    })
  }

  if(usuario.password != password){
    return res.status(400).json({
      erro: true,
    })
  }
  return res.json({
    erro:false,
    user:{
      nome: usuario.nome,
      email: usuario.email
    }
  })
})

app.listen(door, () => {
  console.log(`Servidor rodando em http://localhost:${door}`);
});
