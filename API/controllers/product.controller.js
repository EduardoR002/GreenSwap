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
    if(price <= 0){
        return res.status(422).json({
            message: "Price must be greater than zero"
        });
    }

      // Check if stock is greater than 0
      if(stock <= 0){
        return res.status(422).json({
            message: "Stock must be greater than zero"
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

// Function to get a single product by its ID
function getProduct(req, res) {
    const productId = req.params.productId;
    models.product.findByPk(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json({
                message: "Product found successfully",
                product: product
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function to get all products
function getAllProducts(req, res) {
    models.product.findAll()
        .then(products => {
            if (!products || products.length === 0) {
                return res.status(404).json({
                    message: "No products found"
                });
            }
            res.status(200).json({
                message: "Products found successfully",
                products: products
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
}

// Function used to edit data of one product
function editProduct(req, res){
    const productId = req.params.productId;
    const updatedProductData = req.body;

    // Check if any field is empty
    if (!updatedProductData.name || !updatedProductData.description || !updatedProductData.price || !updatedProductData.stock || !updatedProductData.idtypeproduct) {
        return res.status(422).json({
            message: "All fields are required"
        });
    }

    // Check if price is 0
    if(updatedProductData.price === 0){
        return res.status(422).json({
            message: "Price must be greater than zero"
        });
    }

    // Check if stock is greater than 0
    if(updatedProductData.stock <= 0){
        return res.status(422).json({
            message: "Stock must be greater than zero"
        });
    }

    models.product.findByPk(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            // Check if any data is being updated
            if (
                updatedProductData.name !== product.name ||
                updatedProductData.description !== product.description ||
                updatedProductData.price !== product.price ||
                updatedProductData.stock !== product.stock ||
                updatedProductData.idtypeproduct !== product.idtypeproduct
            ) {
                // If so, update the product
                Object.assign(product, updatedProductData);
                return product.save()
                    .then(updatedProduct => {
                        res.status(200).json({
                            message: "Product updated successfully",
                            product: updatedProduct
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
                    message: "No changes detected, product remains unchanged",
                    product: product
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
    createProduct: createProduct,
    getProduct: getProduct,
    getAllProducts: getAllProducts,
    editProduct: editProduct
}