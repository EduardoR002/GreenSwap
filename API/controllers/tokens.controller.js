const models = require('../models');
const jwt = require('jsonwebtoken');

// Async function used to create an token for a role 'user' or 'seller'
async function createToken(id, role) {
    try {
        // Generate JWT token
        const token = jwt.sign(
            { id: id, role: role},
            '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a',
            { expiresIn: '1h' }
        );

        await models.token.create({
            token: token
        });

        return token;

    } catch (error) {
        throw new Error('Error at creating/updating token: ' + error.message);
    }
}

async function deleteToken(token){
    try {
        const deletedToken = await models.token.destroy({
            where: {
                token: token
            }
        });
        if (deletedToken === 0) {
            return res.status(404).json({
                message: "Token not found"
            });
        }
        return res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

module.exports = {
    createToken: createToken,
};