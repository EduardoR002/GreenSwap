const models = require('../models');
const jwt = require('jsonwebtoken');

// Função utilizada para criar um token
async function createToken(email, userId) {
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
            reject(new Error('Erro ao criar token: ' + error.message)); // Rejeita a promessa com o erro
        });
    });
}

module.exports = {
    createToken: createToken
};