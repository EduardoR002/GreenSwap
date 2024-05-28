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

async function getRole(req, res) {
    const { token } = req.body
    try {
        const decoded = jwt.verify(token, '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a');
        return res.status(200).json({
            role: decoded.role
        })
    } catch (error) {
        console.error('Invalid or expired token:', error.message);
        throw new Error('Invalid or expired token');
    }
}

async function getId(req, res) {
    const { token } = req.body
    try {
        const decoded = jwt.verify(token, '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a');
        return res.status(200).json({
            id: decoded.id
        })
    } catch (error) {
        console.error('Invalid or expired token:', error.message);
        throw new Error('Invalid or expired token');
    }
}

async function deleteToken(req, res){
    try {
        const token = req.body.token;
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

async function renewToken(req, res){
    const token = req.body.token;
    try {
        const oldtoken = await models.token.findOne({ where: {token: token}});
        if (oldtoken) {
            const decodedtoken = jwt.verify(token, '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a');
            const { id, role} = decodedtoken;
            //console.log("ID:", id);
            //console.log("Role:", role);
            const newtoken = jwt.sign(
                { id: id, role: role},
                '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a',
                { expiresIn: '1h' }
            );
            const updatedtoken = await models.token.update({token: newtoken}, {where: {idtoken: oldtoken.idtoken}});
            return res.status(200).json({
                message: "Token renewed with success",
                token: updatedtoken.token
            })
        }
        else{
            return res.status(404).json({
                message: "Token not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function validateToken(req, res){
    const token = req.body.token;
    try {
        jwt.verify(token, '0f1ab83a576c30f57aa5c33de4009cc923923ac041f6f63af8daa1a5ad53254a');
        return res.status(200).json({ 
            message: "Token válido",
            token: token 
        });
    } catch (error) {
        console.error("Erro ao validar token:", error);
        return res.status(403).json({ 
            message: "Token inválido" 
        });
    }
}

module.exports = {
    createToken: createToken,
    deleteToken: deleteToken,
    renewToken: renewToken,
    validateToken: validateToken,
    getRole: getRole,
    getId: getId
};