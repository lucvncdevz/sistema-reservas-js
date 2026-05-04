const jwtoken = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ erro: true, mensagem: "Token não fornecido" }); 
    }

    try {
        const verificado = jwtoken.verify(token, 'UserIsLoggedIn');
        req.user = verificado;
        next();
    } catch (err) {
        return res.status(400).json({ erro: true, mensagem: "Token inválido" });
    }
};

module.exports = validarToken;