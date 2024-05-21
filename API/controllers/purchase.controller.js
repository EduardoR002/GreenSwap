const models = require('../models');

async function deliverDirectPurchase(req, res) {
    const idpurchase = req.body;
}

async function createDirectPurchase(req, res) {
    try {
        const { buydate, quantity, price, idproduct, idUser } = req.body;

        const result = await models.sequelize.query(
            'CALL createDirectPurchase(:in_buydate, :in_quantity, :in_price, :in_idproduct, :in_iduser)',
            {
                replacements: { in_buydate: buydate, in_quantity: quantity, in_price: price, in_idproduct: idproduct, in_iduser: idUser },
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        if (result && result.length > 0 && result[0][0].message === 'Purchase created successfully') {
            res.status(200).json({
                message: "Purchase created successfully"
            });
        } else {
            res.status(500).json({
                message: result[0][0].message
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
    
}

// Async function to create a purchase
async function createPurchase(req, res) {
    const { buydate, previewdate, definitivedate, quantity, price, futurepurchase, idproduct, idtypepurchase, iduser, startday, idpurchasestate } = req.body;

    // Check if quantity and price is greater than zero
    if (quantity <= 0 || price <= 0) {
        return res.status(422).json({
            message: "Quantity and price must be greater than zero"
        });
    }

    
    // Check if any field is empty
    if (!buydate || !idproduct || !idtypepurchase || !idpurchasestate) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    previewdate = buydate + 7 * 24 * 60 * 60 * 1000;

    const newPurchase = {
        buydate,
        previewdate,
        definitivedate,
        quantity,
        price,
        futurepurchase,
        idproduct,
        idtypepurchase,
        iduser,
        startday,
        idpurchasestate
    };

    try {
        // Check if the models exist
        const [product, purchaseType, purchaseState] = await Promise.all([
            models.product.findByPk(idproduct),
            models.purchasetype.findByPk(idtypepurchase),
            models.purchasestate.findByPk(idpurchasestate)
        ]);

        if (!product || !purchaseType || !purchaseState) {
            return res.status(404).json({
                message: "Product, Purchase Type, or Purchase State not found"
            });
        }
        
        // Create purchase
        const createdPurchase = await models.purchase.create(newPurchase);

        res.status(200).json({
            message: "Purchase created successfully",
            purchase: createdPurchase
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to obtain all purchases
async function getAllPurchases(req, res) {
    try {
        const purchases = await models.purchase.findAll();
        if (!purchases || purchases.length === 0) {
            return res.status(404).json({
                message: "No purchases found"
            });
        }
        res.status(200).json({
            message: "Purchases found successfully",
            purchases: purchases
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function used to edit data of one purchase
async function editPurchase(req, res) {
    const purchaseId = req.params.purchaseId;
    const updatedPurchaseData = req.body;
    
        // Extrair quantity e price de updatedPurchaseData
        const { quantity, price } = updatedPurchaseData;

    // Check if quantity and price is greater than zero
    if (quantity <= 0 || price <= 0) {
        return res.status(422).json({
            message: "Quantity and price must be greater than zero"
        });
    }

    // Check if any field is empty
    if (!updatedPurchaseData.buydate || !updatedPurchaseData.quantity || !updatedPurchaseData.price || !updatedPurchaseData.idproduct || !updatedPurchaseData.idtypepurchase || !updatedPurchaseData.idpurchasestate) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }
    
    try {
        const purchase = await models.purchase.findByPk(purchaseId);
        if (!purchase) {
            return res.status(404).json({
                message: "Purchase not found"
            });
        }

        // Check if any data is being updated
        if (
            updatedPurchaseData.buydate !== purchase.buydate ||
            updatedPurchaseData.quantity !== purchase.quantity ||
            updatedPurchaseData.price !== purchase.price ||
            updatedPurchaseData.idproduct !== purchase.idproduct ||
            updatedPurchaseData.idtypepurchase !== purchase.idtypepurchase ||
            updatedPurchaseData.iduser !== purchase.iduser ||
            updatedPurchaseData.startday !== purchase.startday ||
            updatedPurchaseData.idpurchasestate !== purchase.idpurchasestate
        ) {
            // Se sim, atualiza a compra
            Object.assign(purchase, updatedPurchaseData);
            const updatedPurchase = await purchase.save();
            res.status(200).json({
                message: "Purchase updated successfully",
                purchase: updatedPurchase
            });
        } else {
            // Se nenhum dado estiver sendo atualizado, retorna uma mensagem de sucesso
            res.status(200).json({
                message: "No changes detected, purchase remains unchanged",
                purchase: purchase
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
    createPurchase: createPurchase,
    getAllPurchases: getAllPurchases,
    editPurchase: editPurchase,
    createDirectPurchase: createDirectPurchase
};