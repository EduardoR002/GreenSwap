const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

    jwt.verify(token, 'sua_chave_secreta', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = decoded;
        next();
    });
}

module.exports = {
    authenticateToken
}