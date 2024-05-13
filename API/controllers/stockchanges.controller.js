const models = require('../models');

// Function to create a new stock change
function createStockChange(req, res) {
    const { quantity, idtypechange, idproduct } = req.body;

    // Check if any field is empty
    if (!quantity || !idtypechange || !idproduct) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    if(quantity <= 0){
        return res.status(422).json({
            message: "Quantity must be greater than zero"
        });
    }

    const newStockChange = {
        quantity,
        idtypechange,
        idproduct
    };

    // Check if the referenced typechange and idproduct exist
    Promise.all([
        models.typechange.findByPk(idtypechange),
        models.product.findByPk(idproduct)
    ])
        .then(([typeChange, product]) => {
            if (!typeChange || !product) {
                return res.status(404).json({
                    message: "Typechange or Product not found"
                });
            }

            // Create the stock change
            models.stockchanges.create(newStockChange)
                .then(createdStockChange => {
                    res.status(200).json({
                        message: "Stock change created successfully",
                        stockChange: createdStockChange
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error
                    });
                });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}
// Function to get all stock changes
function getAllStockChanges(req, res) {
    models.stockchanges.findAll()
        .then(stockChanges => {
            if (!stockChanges || stockChanges.length === 0) {
                return res.status(404).json({
                    message: "No stock changes found"
                });
            }
            res.status(200).json({
                message: "Stock changes found successfully",
                stockChanges: stockChanges
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to edit data of one stock change
function editChangeStock(req, res) {
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

    models.stockchanges.findByPk(stockChangeId)
        .then(stockChange => {
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
                return stockChange.save()
                    .then(updatedStockChange => {
                        res.status(200).json({
                            message: "Stock change updated successfully",
                            stockChange: updatedStockChange
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: error
                        });
                    });
            } else {
                // If no data is being updated, return a success message
                res.status(200).json({
                    message: "No changes detected, stock change remains unchanged",
                    stockChange: stockChange
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

module.exports = {
    createStockChange: createStockChange,
    getAllStockChanges: getAllStockChanges,
    editChangeStock: editChangeStock
};
