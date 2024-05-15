const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const {
    createPurchase,
    getAllPurchases,
    editPurchase
} = require('../controllers/purchase.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createPurchase
describe('createPurchase function', () => {
    it('should return 200 and the created purchase if successful', async () => {
        const mockPurchase = {
            id: 1,
            buydate: '2024-05-14',
            previewdate: '2024-05-15',
            definitivedate: '2024-05-16',
            quantity: 10,
            price: 100,
            futurepurchase: false,
            idproduct: 1,
            idtypepurchase: 1,
            iduser: 1,
            startday: '2024-05-14',
            idpurchasestate: 1
        };

        models.product.findByPk.mockResolvedValue({});
        models.purchasetype.findByPk.mockResolvedValue({});
        models.purchasestate.findByPk.mockResolvedValue({});
        models.purchase.create.mockResolvedValue(mockPurchase);

        const req = {
            body: {
                buydate: '2024-05-14',
                previewdate: '2024-05-15',
                definitivedate: '2024-05-16',
                quantity: 10,
                price: 100,
                futurepurchase: false,
                idproduct: 1,
                idtypepurchase: 1,
                iduser: 1,
                startday: '2024-05-14',
                idpurchasestate: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase created successfully',
            purchase: mockPurchase
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if quantity or price is not greater than zero', async () => {
        const req = {
            body: {
                buydate: '2024-05-14',
                quantity: 0,
                price: 100,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quantity and price must be greater than zero'
        });
    });

    it('should return 404 if product, purchase type, or purchase state not found', async () => {
        const req = {
            body: {
                buydate: '2024-05-14',
                quantity: 10,
                price: 100,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockResolvedValue(null);
        models.purchasetype.findByPk.mockResolvedValue(null);
        models.purchasestate.findByPk.mockResolvedValue(null);

        await createPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Product, Purchase Type, or Purchase State not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                buydate: '2024-05-14',
                quantity: 10,
                price: 100,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.product.findByPk.mockRejectedValue(new Error('Database error'));

        await createPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

// Group of unit tests that test the function getAllPurchases
describe('getAllPurchases function', () => {
    it('should return 200 and an array of purchases if found', async () => {
        const purchases = [{
            id: 1,
            buydate: '2024-05-14',
            previewdate: '2024-05-15',
            definitivedate: '2024-05-16',
            quantity: 10,
            price: 100,
            futurepurchase: false,
            idproduct: 1,
            idtypepurchase: 1,
            iduser: 1,
            startday: '2024-05-14',
            idpurchasestate: 1
        }];

        models.purchase.findAll.mockResolvedValue(purchases);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllPurchases(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchases found successfully',
            purchases: purchases
        });
    });

    it('should return 404 if no purchases found', async () => {
        models.purchase.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllPurchases(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No purchases found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        models.purchase.findAll.mockRejectedValue(new Error('Database error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllPurchases(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
           error: 'Database error'
        });
    });
});

// Group of unit tests that test the function editPurchase
describe('editPurchase function', () => {
    it('should return 200 and the updated purchase if successful', async () => {
        const mockUpdatedPurchase = {
            id: 1,
            buydate: '2024-05-15',
            previewdate: '2024-05-16',
            definitivedate: '2024-05-17',
            quantity: 20,
            price: 200,
            futurepurchase: false,
            idproduct: 1,
            idtypepurchase: 1,
            iduser: 1,
            startday: '2024-05-15',
            idpurchasestate: 2
        };

        const req = {
            params: {
                purchaseId: '1'
            },
            body: {
                buydate: '2024-05-15',
                previewdate: '2024-05-16',
                definitivedate: '2024-05-17',
                quantity: 20,
                price: 200,
                futurepurchase: false,
                idproduct: 1,
                idtypepurchase: 1,
                iduser: 1,
                startday: '2024-05-15',
                idpurchasestate: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockPurchase = {
            id: 1,
            buydate: '2024-05-14',
            previewdate: '2024-05-15',
            definitivedate: '2024-05-16',
            quantity: 10,
            price: 100,
            futurepurchase: false,
            idproduct: 1,
            idtypepurchase: 1,
            iduser: 1,
            startday: '2024-05-14',
            idpurchasestate: 1,
            save: jest.fn().mockResolvedValue(mockUpdatedPurchase)
        };

        models.purchase.findByPk.mockResolvedValue(mockPurchase);

        await editPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase updated successfully',
            purchase: mockUpdatedPurchase
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            params: {
                purchaseId: '1'
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if quantity or price is not greater than zero', async () => {
        const req = {
            params: {
                purchaseId: '1'
            },
            body: {
                buydate: '2024-05-15',
                quantity: 0,
                price: 200,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Quantity and price must be greater than zero'
        });
    });

    it('should return 404 if the purchase does not exist', async () => {
        const req = {
            params: {
                purchaseId: '1'
            },
            body: {
                buydate: '2024-05-15',
                quantity: 20,
                price: 200,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchase.findByPk.mockResolvedValue(null);

        await editPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                purchaseId: '1'
            },
            body: {
                buydate: '2024-05-15',
                quantity: 20,
                price: 200,
                idproduct: 1,
                idtypepurchase: 1,
                idpurchasestate: 2
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchase.findByPk.mockRejectedValue(new Error('Database error'));

        await editPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});