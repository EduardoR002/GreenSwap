const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Replace with the path to your models
const { createTypePurchase, getAllTypes, editTypePurchase } = require('../controllers/purchasetype.controller.js');

jest.mock('../models');

describe('createTypePurchase function', () => {
    it('should return 200 and the created type purchase if successful', async () => {
        const mockTypePurchase = { 
            id: 1,
            type: 'New Type'
        };

        models.purchasetype.findOne.mockResolvedValue(null);
        models.purchasetype.create.mockResolvedValue(mockTypePurchase);

        const req = { 
            body: {
                type: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type purchase created successfully',
            type: mockTypePurchase
        });
    });

    it('should return 409 if the type purchase already exists', async () => {
        const req = { 
            body: {
                type: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasetype.findOne.mockResolvedValue({});

        await createTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type purchase already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                type: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasetype.findOne.mockRejectedValue(new Error('Database error'));

        await createTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllTypes function', () => {
    it('should return 200 and an array of types if found', async () => {
        const types = [
            { id: 1, type: 'Type 1' },
            { id: 2, type: 'Type 2' }
        ];

        models.purchasetype.findAll.mockResolvedValue(types);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type purchases found successfully',
            types: types
        });
    });

    it('should return 404 if no types are found', async () => {
        models.purchasetype.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No types found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};de
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasetype.findAll.mockRejectedValue(new Error('Database error'));

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('editTypePurchase function', () => {
    it('should return 200 and the updated type purchase if it exists and is successfully updated', async () => {
        const idtype = '1';
        const updatedTypeData = {
            type: 'Updated Type'
        };
        
        // Mock of the type purchase object
        const typePurchase = {
            save: jest.fn().mockResolvedValue(updatedTypeData)
        };

        // Mock of model functions
        models.purchasetype.findByPk.mockResolvedValue(typePurchase);
        models.purchasetype.findOne.mockResolvedValue(null);

        const req = { 
            params: { idtype: idtype }, 
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Type purchase updated successfully",
            type: updatedTypeData
        });
    });

    it('should return 404 if the type purchase does not exist', async () => {
        const req = { 
            params: { idtype: 1 },
            body: {
                type: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasetype.findByPk.mockResolvedValue(null);

        await editTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type purchase not found'
        });
    });

    it('should return 409 if the updated type purchase already exists', async () => {
        const req = { 
            params: { idtype: 1 },
            body: {
                type: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const typePurchase = { id: 1, type: 'Existing Type' };

        models.purchasetype.findByPk.mockResolvedValue(typePurchase);
        models.purchasetype.findOne.mockResolvedValue({});

        await editTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type purchase already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { idtype: 1 },
            body: {
                type: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.purchasetype.findByPk.mockRejectedValue(new Error('Database error'));

        await editTypePurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});