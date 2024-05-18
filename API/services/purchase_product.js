const purchaseController = require('../controllers/purchase.controller');
const proposalController = require('../controllers/proposal.controller');

async function purchase(req, res) {
    try {
        const { buydate, quantity, price, idproduct, idtypepurchase, iduser, idpurchasestate } = req.body;

        // Verificar se os dados obrigatórios estão presentes
        if (!buydate || !price || !idproduct || !idtypepurchase || !idpurchasestate) {
            return res.status(422).json({
                message: "All fields are required"
            });
        }

        // Chamar o controlador de compra para criar a compra
        const createdPurchase = await purchaseController.createPurchase(req.body);

        // Retornar uma resposta com os detalhes da compra criada pelo controlador
        res.status(200).json({
            message: "Direct purchase successful",
            purchase: createdPurchase
        });
    } catch (error) {
        // Lidar com erros
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function purchaseWithProposal(req, res) {
    try {
        const { newprice, iduser, idproduct, idproposalstate, idproposaltype, quantity, futuredate, startdate } = req.body;

        // Verificar se os dados obrigatórios estão presentes
        if (!newprice || !iduser || !idproduct || !idproposalstate || !idproposaltype) {
            return res.status(422).json({
                message: "All fields are required"
            });
        }

        // Chamar o controlador de proposta para criar a proposta
        const proposalData = {
            newprice,
            iduser,
            idproduct,
            idproposalstate,
            idproposaltype,
            quantity,
            futuredate,
            startdate
        };
        const createdProposal = await proposalController.createProposal(proposalData);

        // Verificar se a proposta foi criada com sucesso
        if (!createdProposal) {
            return res.status(500).json({
                message: "Failed to create proposal"
            });
        }

        // Verificar se o estado da proposta é "accepted"
        if (createdProposal.idproposalstate === "accepted") {
            // Transformar a proposta em uma compra
            const purchaseData = {
                buydate: new Date(), // Definir a data de compra como a data atual
                quantity,
                price: newprice, // Usar o preço da proposta como preço da compra
                idproduct,
                idtypepurchase, /* ID do tipo de compra correspondente */
                idpurchasestate, /* ID do estado da compra correspondente */
                iduser,
                startday: startdate
            };
            const createdPurchase = await purchaseController.createPurchase(purchaseData);

            // Retornar uma resposta com os detalhes da compra criada
            return res.status(200).json({
                message: "Purchase created successfully",
                purchase: createdPurchase
            });
        }

        // Se o estado da proposta não for "accepted", retornar uma resposta com os detalhes da proposta criada
        res.status(200).json({
            message: "Proposal created successfully",
            proposal: createdProposal
        });
    } catch (error) {
        // Lidar com erros
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}
    module.exports = {
        purchase:purchase,
        purchaseWithProposal:purchaseWithProposal
    }