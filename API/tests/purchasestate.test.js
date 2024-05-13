const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const {createPurchaseState,getAllPurchaseStates,editPurchaseState} = require('../controllers/purchasestate.controller.js');

jest.mock('../models');

describe('createPurchaseState function', () => {
    it('should return 200 and the created purchase state if successful', async () => {
        const mockPurchaseState = {
            id: 1,
            state: 'New State'
        };

        models.purchasestate.findOne.mockResolvedValue(null);
        models.purchasestate.create.mockResolvedValue(mockPurchaseState);

        const req = {
            body: {
                state: 'New State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase state created successfully',
            state: mockPurchaseState
        });
    });

    it('should return 409 if the purchase state already exists', async () => {
        const req = {
            body: {
                state: 'Existing State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasestate.findOne.mockResolvedValue({});

        await createPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase state already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                state: 'New State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasestate.findOne.mockRejectedValue(new Error('Database error'));

        await createPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('getAllPurchaseStates function', () => {
    it('should return 200 and an array of states if found', async () => {
        const states = [{
                id: 1,
                state: 'State 1'
            },
            {
                id: 2,
                state: 'State 2'
            }
        ];

        models.purchasestate.findAll.mockResolvedValue(states);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllPurchaseStates(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase states found successfully',
            states: states
        });
    });

    it('should return 404 if no states are found', async () => {
        models.purchasestate.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllPurchaseStates(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No purchase states found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasestate.findAll.mockRejectedValue(new Error('Database error'));

        await getAllPurchaseStates(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('editPurchaseState function', () => {
    it('should return 200 and the updated purchase state if it exists and is successfully updated', async () => {
        const idState = '1';
        const updatedStateData = {
            state: 'Updated State'
        };

        const state = {
            save: jest.fn().mockResolvedValue(updatedStateData)
        };

        models.purchasestate.findByPk.mockResolvedValue(state);
        models.purchasestate.findOne.mockResolvedValue(null);

        const req = {
            params: {
                idState: idState
            },
            body: updatedStateData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Purchase state updated successfully",
            state: updatedStateData
        });
    });

    it('should return 404 if the purchase state does not exist', async () => {
        const req = {
            params: {
                idState: 1
            },
            body: {
                state: 'Updated State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasestate.findByPk.mockResolvedValue(null);

        await editPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase state not found'
        });
    });

    it('should return 409 if the updated purchase state already exists', async () => {
        const req = {
            params: {
                idState: 1
            },
            body: {
                state: 'Existing State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const state = {
            id: 1,
            state: 'Existing State'
        };

        models.purchasestate.findByPk.mockResolvedValue(state);
        models.purchasestate.findOne.mockResolvedValue({});

        await editPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Purchase state already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                idState: 1
            },
            body: {
                state: 'Updated State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasestate.findByPk.mockRejectedValue(new Error('Database error'));

        await editPurchaseState(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});