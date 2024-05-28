const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const { createTypeChange, getAllTypes, editTypeChange } = require('../controllers/tchange.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createTypeChange
describe('createTypeChange function', () => {
    it('should return 200 and the type change object if the type change is created successfully', async () => {
        const mockTypeChange = { 
            id: 1,
            typechange: 'New Type'
        };

        models.typechange.findOne.mockResolvedValue(null);
        models.typechange.create.mockResolvedValue(mockTypeChange);

        const req = { 
            body: {
                typechange: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type change created successfully',
            typechange: mockTypeChange
        });
    });

    it('should return 409 if the type change already exists', async () => {
        const req = { 
            body: {
                typechange: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findOne.mockResolvedValue({});

        await createTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type change already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                typechange: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findOne.mockRejectedValue(new Error('Database error'));

        await createTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

// Group of unit tests that test the function getAllTypes
describe('getAllTypes function', () => {
    it('should return 200 and an array of types if types are found', async () => {
        const types = [
            { id: 1, typechange: 'Type 1' },
            { id: 2, typechange: 'Type 2' }
        ];

        models.typechange.findAll.mockResolvedValue(types);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type change found successfully',
            types: types
        });
    });

    it('should return 404 if no types are found', async () => {
        models.typechange.findAll.mockResolvedValue([]);

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
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findAll.mockRejectedValue(new Error('Database error'));

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

// Group of unit tests that test the function editTypeChange
describe('editTypeChange function', () => {
    it('should return 200 and the updated type change if it exists and is successfully updated', async () => {
        const idtypechange = '1';
        const updatedTypeData = {
            typechange: 'Updated Type'
        };
        
        // Mock do objeto typechange
        const typechange = {
            save: jest.fn().mockImplementation(async function() {
                return updatedTypeData;
            })
        };

        // Mock das funções de modelo
        models.typechange.findByPk.mockResolvedValue(typechange);
        models.typechange.findOne.mockResolvedValue(null);

        const req = { 
            params: { idtypechange: idtypechange }, 
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Type change updated successfully",
            typechange: updatedTypeData
        });
    });

    it('should return 404 if the type change does not exist', async () => {
        const req = { 
            params: { idtypechange: 1 },
            body: {
                typechange: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findByPk.mockResolvedValue(null);

        await editTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type change not found'
        });
    });

    it('should return 409 if the updated type change already exists', async () => {
        const req = { 
            params: { idtypechange: 1 },
            body: {
                typechange: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const typechange = { id: 1, typechange: 'Existing Type' };

        models.typechange.findByPk.mockResolvedValue(typechange);
        models.typechange.findOne.mockResolvedValue({});

        await editTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type change already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { idtypechange: 1 },
            body: {
                typechange: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typechange.findByPk.mockRejectedValue(new Error('Database error'));

        await editTypeChange(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});