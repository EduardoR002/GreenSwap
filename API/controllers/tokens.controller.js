const models = require('../models');
const jwt = require('jsonwebtoken');

// Função utilizada para criar um token
function createToken(email, userId) {
    // Gerar token JWT
    const token = jwt.sign(
        { email: email, userId: userId },
        '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a', // Substitua pela sua chave secreta real
        { expiresIn: '1h' }
    );

    // Inserir dados do token na tabela de tokens e retornar uma promessa
    return new Promise((resolve, reject) => {
        models.token.create({
            userId: userId,
            token: token,
        }).then(() => {
            resolve(token); // Resolve a promessa com o token gerado
        }).catch(error => {
            reject(new Error('Error at creating token: ' + error.message)); // Rejeita a promessa com o erro
        });
    });
}

async function renewToken(req, res){
    const { userId } = req.body;
    
    try {
        // Lógica para renovar o token na base de dados
        const token = await models.token.findOne({ where: { userId: userId } });
        if (token) {
            // Atualize o token, por exemplo, estendendo sua expiração
            token.expiresAt = new Date(Date.now() + 3600000); // Estende por 1 hora
            await token.save();
            return res.json({ message: "Token renewed with success" });
        } else {
            return res.status(404).json({ message: "Token not founded" });
        }
    } catch (error) {
        console.error("Error at renew token:", error);
        return res.status(500).json({ message: "Error at renew token: "});
    }
}

// Function that every minute will check all tokens and see if any of them is revoked
async function revokeExpiredOrUnrenewedTokens() {
    try {
        const tokens = await models.token.findAll();

        const currentTime = new Date();
        const expirationTimeThreshold = new Date(currentTime.getTime() - (1 * 60 * 60 * 1000)); // 1 hora atrás

        for (const token of tokens) {
            if (token.updatedAt < expirationTimeThreshold && token.updatedAt != token.revokedAt) {
                token.revokedAt = currentTime.getTime()
                token.revoked = true;
                await token.save();
                console.log("Token revoked:", token.token);
            }
        }

        console.log("Token revocation completed.");
    } catch (error) {
        console.error("Error at token revocation:", error);
    }
}

async function removeRevokedTokens(){
    try {
        const tokens = await models.token.findAll();

        const currentTime = new Date();
        const revokedTimeThreshold = new Date(currentTime.getTime() - (6 * 60 * 60 * 1000));

        for (const token of tokens) {
            if (token.revoked && token.revokedAt < revokedTimeThreshold) {
                await token.destroy();
                console.log("Revoked Token removed: ", token.token);
            }
            console.log("Removal of revoked tokens completed.");
        }
    } catch (error) {
        
    }
}

setInterval(revokeExpiredOrUnrenewedTokens, 60000);
setInterval(removeRevokedTokens, 60000);

module.exports = {
    createToken: createToken
};