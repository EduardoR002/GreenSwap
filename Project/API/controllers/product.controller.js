const models = require('../models');

// Async function to create a new product
async function createProduct(req, res) {
    const { name, description, price, stock, idtypeproduct, idseller } = req.body;
    const photo = req.file.buffer;

    try {

        // Check if price is greater than zero
        if (price <= 0) {
            return res.status(422).json({
                message: "Price must be greater than zero"
            });
        }
          // Check if stock is greater than zero
          if (stock <= 0) {
            return res.status(422).json({
                message: "Stock must be greater than zero"
            });
        }

        // Check if any field is empty
        if (!name || !description || !idtypeproduct || !idseller) {
            return res.status(422).json({
                message: "All fields are required"
            });
        }

        // Check if the type of product and the seller exist
        const [typeProduct, seller] = await Promise.all([
            models.typeproduct.findByPk(idtypeproduct),
            models.seller.findByPk(idseller)
        ]);

        if (!typeProduct || !seller) {
            return res.status(404).json({
                message: "Type of product or seller not found"
            });
        }

        // Check if a product with the same name, seller, and type already exists
        const existingProduct = await models.product.findOne({
            where: {
                name: name,
                idseller: idseller,
                idtypeproduct: idtypeproduct
            }
        });

        if (existingProduct) {
            return res.status(409).json({
                message: "Product with the same name, seller, and type already exists"
            });
        }
        
        // Create the new product
        const newProduct = {
            name,
            description,
            price,
            stock,
            idtypeproduct,
            idseller,
            photo
        };

        const createdProduct = await models.product.create(newProduct);

        res.status(200).json({
            message: "Product created successfully",
            product: createdProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to get a single product by its ID
async function getProduct(req, res) {
    const { idproduct } = req.body;
    try {
        const [result] = await models.sequelize.query(
            'CALL getProduct(:in_idproduct)',
            {
                replacements: { in_idproduct: idproduct },
                type: models.sequelize.QueryTypes.SELECT
            }
        );
        return res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to get all products
async function getAllProducts(req, res) {
    try {
        const { search_name, max_price, min_price } = req.body; // Assuming the search name is provided in the request body

        // Call the stored procedure using sequelize
        const products = await models.sequelize.query(
            'CALL getAllProducts(:search_name, :max_price, :min_price)',
            {
                replacements: { search_name: search_name, max_price: max_price, min_price: min_price },
                type: models.sequelize.QueryTypes.SELECT
            }
        );

        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        const productsWithBase64Photos = products.map(product => {
            if (product.photo && Buffer.isBuffer(product.photo)) {
                const base64Image = product.photo.toString('base64');
                return { ...product, photo: base64Image };
            } else {
                return product;
            }
        });

        res.status(200).json({
            message: "Products found successfully",
            products: productsWithBase64Photos
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

// Async function used to edit data of one product
async function editProduct(req, res) {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    try {

        // Check if price is greater than zero
        if (updatedProductData.price <= 0) {
            return res.status(422).json({
                message: "Price must be greater than zero"
            });
        }

        // Check if stock is greater than zero
        if (updatedProductData.stock <= 0) {
            return res.status(422).json({
                message: "Stock must be greater than zero"
            });
        }
        
        // Check if any field is empty
        if (!updatedProductData.name || !updatedProductData.description || !updatedProductData.idtypeproduct || !updatedProductData.idseller) {
            return res.status(422).json({
                message: "All fields are required"
            });
        }

        const product = await models.product.findByPk(productId);

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
            updatedProductData.idtypeproduct !== product.idtypeproduct ||
            updatedProductData.idseller !== product.idseller
        ) {
            // If so, update the product
            Object.assign(product, updatedProductData);
            const updatedProduct = await product.save();

            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct
            });
        } else {
            // If no data is being updated, return a success message
            res.status(200).json({
                message: "No changes detected, product remains unchanged",
                product: product
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

// Async function to edit the stock of a product
async function editProductStock(productId, newStock) {
    try {
        const product = await models.product.findByPk(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        // Update the product's stock
        await models.product.update({ stock: newStock }, { where: { idproduct: productId } });
        return true; // Indicate success
    } catch (error) {
        throw error; // Throw error for handling in calling function
    }
}

async function getBestProducts(req, res){
    try {
        const [result] = await models.sequelize.query(
            'CALL getBestProducts()',
            {
                type: models.sequelize.QueryTypes.SELECT
            }
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

async function getProductsBySeller(req, res){
    const { idseller } = req.body;
    try {
        const [result] = await models.sequelize.query(
            'CALL getSellerProducts(:in_idseller)',
            {
                replacements: { in_idseller: idseller },
                type: models.sequelize.QueryTypes.SELECT
            }
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    getAllProducts: getAllProducts,
    editProduct: editProduct,
    editProductStock: editProductStock,
    getBestProducts: getBestProducts,
    getProductsBySeller: getProductsBySeller
}