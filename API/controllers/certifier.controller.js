const models = require('../models');

// Função para criar um novo certificador
async function createCertifier(req, res) {
    const { name, email, password } = req.body;

    // Verifica se algum campo está vazio
    if (!name || !email || !password) {
        return res.status(422).json({
            message: "Todos os campos são obrigatórios"
        });
    }

    const certifier = {
        name,
        email,
        password,
    };

    try {
        // Verifica se o email é único
        const existingCertifier = await models.certifier.findOne({
            where: {
                email
            }
        });

        if (existingCertifier) {
            // Se o email já existir, retorna erro 409
            return res.status(409).json({
                message: "Email já existe"
            });
        } else {
            // Se o email for novo no banco de dados, então prossiga para criar um novo Certificador
            const result = await models.certifier.create(certifier);
            return res.status(200).json({
                message: "Certificador criado com sucesso",
                certifier: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Algo deu errado",
            error: error
        });
    }
}

// Função para obter todos os dados de um Certificador
async function getCertifier(req, res) {
    const idCertifier = req.params.certifierId;
    try {
        const certifier = await models.certifier.findOne({ where: { idCertifier: idCertifier } });
        if (!certifier) {
            return res.status(404).json({
                message: "Certificador não encontrado"
            });
        }
        
        return res.status(200).json({
            message: "Certificador encontrado com sucesso",
            certifier: certifier
        });
    } catch (error) {
        return res.status(500).json({
            message: "Algo deu errado",
            error: error
        });
    }
}

// Função para obter todos os dados dos certificadores
async function getAllCertifiers(req, res) {
    try {
        const certifiers = await models.certifier.findAll();
        if (!certifiers || certifiers.length === 0) {
            return res.status(404).json({
                message: "Nenhum certificador encontrado"
            });
        }
        return res.status(200).json({
            message: "Certificadores encontrados com sucesso",
            certifiers: certifiers
        });
    } catch (error) {
        return res.status(500).json({
            message: "Algo deu errado",
            error: error
        });
    }
}

// Função para editar dados de um certificador
async function editCertifier(req, res) {
    const certifierId = req.params.certifierId;
    const updatedCertifierData = req.body;

    try {
        const certifier = await models.certifier.findByPk(certifierId);
        if (!certifier) {
            return res.status(404).json({
                message: "Certificador não encontrado"
            });
        }

        // Verifica se o email está sendo atualizado
        if (updatedCertifierData.email !== certifier.email) {
            // Se sim, verifica se o novo email já existe
            const existingCertifier = await models.certifier.findOne({
                where: {
                    [models.Sequelize.Op.or]: [{
                        email: updatedCertifierData.email
                    }]
                }
            });
            if (existingCertifier && existingCertifier.idcertifier !== certifierId) {
                return res.status(409).json({
                    message: "Email já existe"
                });
            }
        }
        // Se não houver conflito, atualiza o certificador
        Object.assign(certifier, updatedCertifierData);
        const updatedCertifier = await certifier.save();
        return res.status(200).json({
            message: "Certificador atualizado com sucesso",
            certifier: updatedCertifier
        });
    } catch (error) {
        return res.status(500).json({
            message: "Algo deu errado",
            error: error
        });
    }
}



module.exports = {
    createCertifier: createCertifier,
    getCertifier: getCertifier,
    getAllCertifiers: getAllCertifiers,
    editCertifier: editCertifier
}