const models = require('../models');

// Função assíncrona para criar um novo vendedor
async function createSeller(req, res) {
    const { idrequest, idcertificate, userId } = req.body;

    // Verifica se algum campo está vazio
    if (!idrequest || !idcertificate || !userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        // Verifica se o requestseller e o certificado existem
        const [requestSeller, certificate] = await Promise.all([
            models.requestseller.findByPk(idrequest),
            models.certificate.findByPk(idcertificate)
        ]);

        if (!requestSeller || !certificate) {
            return res.status(404).json({
                message: "Request Seller or Certificate not found"
            });
        }

        // Cria o vendedor
        const createdSeller = await models.seller.create({
            idrequest,
            idcertificate,
            userId
        });

        res.status(200).json({
            message: "Seller created successfully",
            seller: createdSeller
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Função assíncrona para obter um único vendedor pelo seu ID
async function getSeller(req, res) {
    const sellerId = req.params.sellerId;

    try {
        const seller = await models.seller.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found"
            });
        }
        res.status(200).json({
            message: "Seller found successfully",
            seller: seller
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Função assíncrona para obter todos os vendedores
async function getAllSellers(req, res) {
    try {
        const sellers = await models.seller.findAll();
        if (!sellers || sellers.length === 0) {
            return res.status(404).json({
                message: "No sellers found"
            });
        }
        res.status(200).json({
            message: "Sellers found successfully",
            sellers: sellers
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Função assíncrona para editar os dados de um vendedor
async function editSeller(req, res) {
    const sellerId = req.params.sellerId;
    const updatedSellerData = req.body;

    // Verifica se algum campo está vazio
    if (!updatedSellerData.idrequest || !updatedSellerData.idcertificate || !updatedSellerData.userId) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        // Verifica se o requestseller e o certificado existem
        const [requestSeller, certificate] = await Promise.all([
            models.requestseller.findByPk(updatedSellerData.idrequest),
            models.certificate.findByPk(updatedSellerData.idcertificate)
        ]);

        if (!requestSeller || !certificate) {
            return res.status(404).json({
                message: "Request Seller or Certificate not found"
            });
        }

        const seller = await models.seller.findByPk(sellerId);
        if (!seller) {
            return res.status(404).json({
                message: "Seller not found"
            });
        }

        // Verifica se algum dado está sendo atualizado
        if (
            updatedSellerData.idrequest !== seller.idrequest ||
            updatedSellerData.idcertificate !== seller.idcertificate ||
            updatedSellerData.userId !== seller.userId
        ) {
            // Se sim, atualiza o vendedor
            Object.assign(seller, updatedSellerData);
            const updatedSeller = await seller.save();
            res.status(200).json({
                message: "Seller updated successfully",
                seller: updatedSeller
            });
        } else {
            // Se nenhum dado estiver sendo atualizado, retorna uma mensagem de sucesso
            res.status(200).json({
                message: "No changes detected, seller remains unchanged",
                seller: seller
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    createSeller: createSeller,
    getSeller: getSeller,
    getAllSellers: getAllSellers,
    editSeller: editSeller
};