const jwtoken = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).end(); 
    }

    try {
        const verificado = jwtoken.verify(token, 'UserIsLoggedIn');
        req.user = verificado;
        next();
    } catch (err) {
        res.status(400).end();
    }
};

module.exports = validarToken;