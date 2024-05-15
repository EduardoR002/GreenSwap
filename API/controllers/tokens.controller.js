const models = require('../models');
const jwt = require('jsonwebtoken');

// Async function used to create an token for a role 'user' or 'seller'
async function createTokenUser(email, userId, role) {
    try {
        // Generate JWT token
        const token = jwt.sign(
            { email: email, userId: userId },
            '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a',
            { expiresIn: '1h' }
        );

        // Check if a token already exists for the user
        let existingToken = await models.token.findOne({ where: { userId: userId } });

        if (existingToken) {
            // Update the existing token
            existingToken.token = token;
            existingToken.role = role;
            existingToken.revoked = false;
            existingToken.revokedAt = null;
            await existingToken.save();
            return existingToken;
        } else {
            // Create a new token
            existingToken = await models.token.create({
                userId: userId,
                token: token,
                role: role
            });
            return existingToken;
        }
    } catch (error) {
        throw new Error('Error at creating/updating token: ' + error.message);
    }
}
/* Async function that create a token certifier */
async function createTokenCertifier(email, idcertifier, role) {
    try {
        // Generate JWT token
        const token = jwt.sign(
            { email: email, idcertifier: idcertifier },
            '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a',
            { expiresIn: '1h' }
        );

        // Check if a token already exists for the user
        let existingToken = await models.token.findOne({ where: { idcertifier: idcertifier } });

        if (existingToken) {
            // Update the existing token
            existingToken.token = token;
            existingToken.role = role;
            existingToken.revoked = false;
            existingToken.revokedAt = null;
            await existingToken.save(); // Save the updated token
        } else {
            // Create a new token
            await models.token.create({
                idcertifier: idcertifier,
                token: token,
                role: role
            });
        }

        return token; // Resolve the promise with the new token
    } catch (error) {
        throw new Error('Error at creating/updating token: ' + error.message);
    }
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
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
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
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

setInterval(revokeExpiredOrUnrenewedTokens, 60000);
setInterval(removeRevokedTokens, 60000); 

module.exports = {
    createTokenUser: createTokenUser,
    createTokenCertifier: createTokenCertifier,
    removeRevokedTokens: removeRevokedTokens,
    revokeExpiredOrUnrenewedTokens: revokeExpiredOrUnrenewedTokens
};