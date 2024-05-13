const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); 
const stockChangeController = require('../controllers/stockchanges.controller');

jest.mock('../models');

describe('createStockChange function', () => {
    it('should return 200 and the stock change object if the stock change is created successfully', async () => {
        const mockTypeChange = { 
            idtypechange: 1,
            typechange: 'add'
        };

        const mockProduct = {
            id: 1,
            name: "Product Example",
            description: "This is an example product",
            price: 10.99,
            stock: 100,
            idtypeproduct: 1,
            idseller: 1
        };

        const mockStockChange = { 
            id: 1,
            quantity: 5,
            idtypechange: 1,
            idproduct: 1
        };

        // Create a mock function using jest.fn()
        const findByPkMock = jest.fn();

        // Replace the original findByPk function with the mock
        models.typechange.findByPk = findByPkMock;

        // Now, you can set up the mock implementation
        const originalFindByPk = findByPkMock.mockImplementation(() => {
            return mockTypeChange;
        });
        models.product.findByPk.mockResolvedValue(mockProduct);
        models.stockchanges.create.mockResolvedValue(mockStockChange);

        const req = { 
            body: {
                quantity: 5,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await stockChangeController.createStockChange(req, res);

        expect(originalFindByPk).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock change created successfully',
            stockChange: mockStockChange
        });
    });

    it('should return 404 if the referenced typechange or product does not exist', async () => {
        const req = { 
            body: {
                quantity: 5,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findByPk.mockResolvedValue(null); // Simulando que o tipo de mudança não existe
        models.product.findByPk.mockResolvedValue(null); // Simulando que o produto não existe

        await stockChangeController.createStockChange(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Typechange or Product not found'
        });
    });

    it('should return 422 if any field is empty', async () => {
        const req = { 
            body: {} // Simulando campos em falta
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.createStockChange(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if quantity is less than or equal to zero', async () => {
        const req = { 
            body: {
                quantity: 0,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.createStockChange(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quantity must be greater than zero'
        });
    });
});

describe('getAllStockChanges function', () => {
    it('should return 200 and an array of stock changes if stock changes are found', async () => {
        const mockStockChanges = [
            { id: 1, quantity: 5, idtypechange: 1, idproduct: 1 },
            { id: 2, quantity: 10, idtypechange: 2, idproduct: 2 }
        ];

        models.stockchanges.findAll.mockResolvedValue(mockStockChanges);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.getAllStockChanges(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock changes found successfully',
            stockChanges: mockStockChanges
        });
    });

    it('should return 404 if no stock changes are found', async () => {
        models.stockchanges.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.getAllStockChanges(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No stock changes found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.stockchanges.findAll.mockRejectedValue(new Error('Database error'));

        await stockChangeController.getAllStockChanges(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('editChangeStock function', () => {
    it('should return 200 and the updated stock change if it exists and is successfully updated', async () => {
        const mockStockChange = { 
            id: 1,
            quantity: 5,
            idtypechange: 1,
            idproduct: 1,
            save: jest.fn().mockImplementation(async () => mockStockChange)
        };
        
        models.stockchanges.findByPk.mockResolvedValue(mockStockChange);

        const req = { 
            params: { stockChangeId: 1 }, 
            body: {
                quantity: 10,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.editChangeStock(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock change updated successfully',
            stockChange: expect.objectContaining(req.body)
        });
    });

    it('should return 404 if the stock change does not exist', async () => {
        const req = { 
            params: { stockChangeId: 1 },
            body: {
                quantity: 10,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.stockchanges.findByPk.mockResolvedValue(null);

        await stockChangeController.editChangeStock(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Stock change not found'
        });
    });

    it('should return 422 if any field is empty', async () => {
        const req = { 
            params: { stockChangeId: 1 },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.editChangeStock(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if quantity is negative', async () => {
        const req = { 
            params: { stockChangeId: 1 },
            body: {
                quantity: -10,
                idtypechange: 1,
                idproduct: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await stockChangeController.editChangeStock(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quantity must be a non-negative value'
        });
    });
});