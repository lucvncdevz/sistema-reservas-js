const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/auth'); // Puxa o segurança aqui

router.post("/login", (req, res) => {
});


router.get("/dashboard", validarToken, (req, res) => {
    res.status(200).end(); 
});

router.get("/perfil", validarToken, (req, res) => {
    res.status(200).end();
});

module.exports = router;