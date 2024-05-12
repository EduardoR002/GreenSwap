const models = require('../models')

function createProduct(req, res) {
    const { name, description, price, stock, idtypeproduct } = req.body;

    // Check if any field is empty
    if (!name || !description || !price || !stock || !idtypeproduct) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }
    //Check if price is 0
    if(price === 0){
        return res.status(422).json({
            message: "Price must be greater than zero"
        });
    }

    const newProduct = {
        name,
        description,
        price,
        stock,
        idtypeproduct
    };

    // Check if the type of product ID exists in the typeproduct table
    models.typeproduct.findByPk(idtypeproduct)
        .then(typeProduct => {
            if (!typeProduct) {
                return res.status(404).json({
                    message: "Type of product not found"
                });
            }

            // Create the product
            models.product.create(newProduct)
                .then(createdProduct => {
                    res.status(200).json({
                        message: "Product created successfully",
                        product: createdProduct
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