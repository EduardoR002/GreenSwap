const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const { createProduct, getProduct, getAllProducts, editProduct } = require('../controllers/product.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createProduct
describe('createProduct function', () => {
    it('should return 200 and the created product if successful', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            description: 'Test Description',
            price: 10.99,
            stock: 100,
            idtypeproduct: 1,
            idseller: 1
        };

        models.typeproduct.findByPk.mockResolvedValue({});
        models.seller.findByPk.mockResolvedValue({});
        models.product.findOne.mockResolvedValue(null);
        models.product.create.mockResolvedValue(mockProduct);

        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product created successfully',
            product: mockProduct
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if price is not greater than zero', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 0,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Price must be greater than zero'
        });
    });

    it('should return 422 if stock is not greater than zero', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 0,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock must be greater than zero'
        });
    });

    it('should return 404 if type of product or seller not found', async () => {
        models.typeproduct.findByPk.mockResolvedValue(null);

        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type of product or seller not found'
        });
    });

    it('should return 409 if product with the same name, seller, and type already exists', async () => {
        models.typeproduct.findByPk.mockResolvedValue({});
        models.seller.findByPk.mockResolvedValue({});
        models.product.findOne.mockResolvedValue({});

        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product with the same name, seller, and type already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                name: 'Test Product',
                description: 'Test Description',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findByPk.mockResolvedValue({});
        models.seller.findByPk.mockResolvedValue({});
        models.product.findOne.mockRejectedValue(new Error('Database error'));

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

// Group of unit tests that test the function getProduct
/*describe('getProduct function', () => {
    it('should return 200 and the product if found', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            description: 'Test Description',
            price: 10.99,
            stock: 100,
            idtypeproduct: 1,
            idseller: 1
        };

        models.product.findByPk.mockResolvedValue(mockProduct);

        const req = {
            params: {
                productId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product found successfully',
            product: mockProduct
        });
    });

    it('should return 404 if the product is not found', async () => {
        models.product.findByPk.mockResolvedValue(null);

        const req = {
            params: {
                productId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                productId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockRejectedValue(new Error('Database error'));

        await getProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});*/

// Group of unit tests that test the function getAllProducts
describe('getAllProducts function', () => {
    it('should return 200 and an array of products if found without search parameters', async () => {
        const products = [{
                id: 1,
                name: 'Test Product 1',
                description: 'Test Description 1',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            },
            {
                id: 2,
                name: 'Test Product 2',
                description: 'Test Description 2',
                price: 20.99,
                stock: 200,
                idtypeproduct: 2,
                idseller: 2
            }
        ];

        models.sequelize.query.mockResolvedValue(products);

        const req = {
            body: {
                search_name: '',
                max_price: '0',
                min_price: '0'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Products found successfully',
            products: products
        });
    });

    it('should return 200 and an array of products if found with search parameters', async () => {
        const products = [{
            id: 1,
            name: 'Test Product 1',
            description: 'Test Description 1',
            price: 10.99,
            stock: 100,
            idtypeproduct: 1,
            idseller: 1
        },
        {
            id: 2,
            name: 'Test Product 2',
            description: 'Test Description 2',
            price: 20.99,
            stock: 200,
            idtypeproduct: 2,
            idseller: 2
        }];
    
        models.sequelize.query.mockResolvedValue(products);
    
        const req = {
            body: {
                search_name: 'Test',
                max_price: 15.00,
                min_price: 5.00
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await getAllProducts(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Products found successfully',
            products
        });
    });
    
    it('should return 200 and an array of products if found with search parameters, but not all products meet the criteria', async () => {
        const allProducts = [
            {
                id: 1,
                name: 'Test Product 1',
                description: 'Test Description 1',
                price: 10.99,
                stock: 100,
                idtypeproduct: 1,
                idseller: 1
            },
            {
                id: 2,
                name: 'Test Product 2',
                description: 'Test Description 2',
                price: 20.99,
                stock: 200,
                idtypeproduct: 2,
                idseller: 2
            },
            {
                id: 3,
                name: 'Another Product',
                description: 'Another Description',
                price: 5.99,
                stock: 50,
                idtypeproduct: 3,
                idseller: 3
            }
        ];
    
        // Mock response including products that partially meet the search criteria
        const products = allProducts.filter(product =>
            product.name.includes('Test') && product.price >= 5.00 && product.price <= 15.00
        );
    
        models.sequelize.query.mockResolvedValue(products);
    
        const req = {
            body: {
                search_name: 'Test',
                max_price: 15.00,
                min_price: 5.00
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await getAllProducts(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        // Check if only products meeting the criteria are returned
        expect(res.json).toHaveBeenCalledWith({
            message: 'Products found successfully',
            products
        });
    });

    it('should return 404 if no products are found', async () => {
        models.sequelize.query.mockResolvedValue([]);

        const req = {
            body: {
                search_name: 'test',
                max_price: '0',
                min_price: '0'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No products found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                search_name: 'test',
                max_price: '0',
                min_price: '0'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.sequelize.query.mockRejectedValue(new Error('Database error'));

        await getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

// Group of unit tests that test the function editProduct
describe('editProduct function', () => {
    it('should return 200 and the updated product data if successful', async () => {
        const productId = '1';
        const updatedProductData = {
            name: 'Updated Product',
            description: 'Updated Description',
            price: 15.99,
            stock: 150,
            idtypeproduct: 2,
            idseller: 2
        };

        const product = {
            save: jest.fn().mockResolvedValue(updatedProductData)
        };

        models.product.findByPk.mockResolvedValue(product);

        const req = {
            params: {
                productId: productId
            },
            body: updatedProductData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Product updated successfully",
            product: updatedProductData
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            params: {
                productId: '1'
            },
            body: {
                description: 'Updated Description',
                price: 15.99,
                stock: 150,
                idtypeproduct: 2,
                idseller: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if price is not greater than zero', async () => {
        const req = {
            params: {
                productId: '1'
            },
            body: {
                name: 'Updated Product',
                description: 'Updated Description',
                price: 0,
                stock: 150,
                idtypeproduct: 2,
                idseller: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Price must be greater than zero'
        });
    });

    it('should return 422 if stock is not greater than zero', async () => {
        const req = {
            params: {
                productId: '1'
            },
            body: {
                name: 'Updated Product',
                description: 'Updated Description',
                price: 15.99,
                stock: 0,
                idtypeproduct: 2,
                idseller: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock must be greater than zero'
        });
    });

    it('should return 404 if the product does not exist', async () => {
        const req = {
            params: {
                productId: '1'
            },
            body: {
                name: 'Updated Product',
                description: 'Updated Description',
                price: 15.99,
                stock: 150,
                idtypeproduct: 2,
                idseller: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockResolvedValue(null);

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product not found'
        });
    });

    it('should return 200 with success message if no data is being updated', async () => {
        const productId = '1';
        const unchangedProductData = {
            name: 'Unchanged Product',
            description: 'Unchanged Description',
            price: 10.99,
            stock: 100,
            idtypeproduct: 1,
            idseller: 1
        };

        const req = {
            params: {
                productId: productId
            },
            body: unchangedProductData
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockResolvedValue(unchangedProductData);

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No changes detected, product remains unchanged',
            product: unchangedProductData
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                productId: '1'
            },
            body: {
                name: 'Updated Product',
                description: 'Updated Description',
                price: 15.99,
                stock: 150,
                idtypeproduct: 2,
                idseller: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockRejectedValue(new Error('Database error'));

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});