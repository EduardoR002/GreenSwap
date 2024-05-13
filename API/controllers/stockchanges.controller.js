const models = require('../models');
const productController = require('./product.controller');


// Function to create a new stock change
async function createStockChange(req, res) {
    const { quantity, idtypechange, idproduct } = req.body;

    // Check if quantity is less than or equal to zero
    if (quantity <= 0) {
        return res.status(422).json({
            message: "Quantity must be greater than zero"
        });
    }

    // Check if any other field is empty
    if (!idtypechange || !idproduct) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    try {
        // Check if the referenced typechange and idproduct exist
        const [typeChange, product] = await Promise.all([
            models.typechange.findByPk(idtypechange),
            models.product.findByPk(idproduct)
        ]);

        if (!typeChange || !product) {
            return res.status(404).json({
                message: "Typechange or Product not found"
            });
        }

        // Adjust the product's stock based on the type of change
        let updatedStock = product.stock;
        if (typeChange.typechange === 'add') {
            updatedStock += quantity;
        } else if (typeChange.typechange === 'remove') {
            if (quantity > product.stock) {
                return res.status(422).json({
                    message: "Insufficient stock to perform the operation"
                });
            }
            updatedStock -= quantity;
        } else {
            return res.status(422).json({
                message: "Invalid type of change"
            });
        }

        // Update the product's stock
        await productController.editProductStock(idproduct, updatedStock);

        // Create the stock change
        const newStockChange = {
            quantity,
            idtypechange,
            idproduct
        };
        const createdStockChange = await models.stockchanges.create(newStockChange);

        res.status(200).json({
            message: "Stock change created successfully",
            stockChange: createdStockChange
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}
// Function to get all stock changes
async function getAllStockChanges(req, res) {
    try {
        const stockChanges = await models.stockchanges.findAll();
        if (!stockChanges || stockChanges.length === 0) {
            return res.status(404).json({
                message: "No stock changes found"
            });
        }
        res.status(200).json({
            message: "Stock changes found successfully",
            stockChanges: stockChanges
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Function used to edit data of one stock change
async function editChangeStock(req, res) {
    const stockChangeId = req.params.stockChangeId;
    const updatedStockChangeData = req.body;

    // Check if any field is empty
    if (!updatedStockChangeData.quantity || !updatedStockChangeData.idtypechange || !updatedStockChangeData.idproduct) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    // Check if quantity is not negative
    if (updatedStockChangeData.quantity < 0) {
        return res.status(422).json({
            message: "Quantity must be a non-negative value"
        });
    }

    try {
        const stockChange = await models.stockchanges.findByPk(stockChangeId);
        if (!stockChange) {
            return res.status(404).json({
                message: "Stock change not found"
            });
        }

        // Check if any data is being updated
        if (
            updatedStockChangeData.quantity !== stockChange.quantity ||
            updatedStockChangeData.idtypechange !== stockChange.idtypechange ||
            updatedStockChangeData.idproduct !== stockChange.idproduct
        ) {
            // If so, update the stock change
            Object.assign(stockChange, updatedStockChangeData);
            const updatedStockChange = await stockChange.save();
            res.status(200).json({
                message: "Stock change updated successfully",
                stockChange: updatedStockChange
            });
        } else {
            // If no data is being updated, return a success message
            res.status(200).json({
                message: "No changes detected, stock change remains unchanged",
                stockChange: stockChange
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
    createStockChange: createStockChange,
    getAllStockChanges: getAllStockChanges,
    editChangeStock: editChangeStock
};
