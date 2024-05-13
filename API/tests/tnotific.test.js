const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const { createTypeNotification, getAllTypes, editTypeNotification } = require('../controllers/tnotific.controller.js');

jest.mock('../models');

describe('createTypeNotification function', () => {
    it('should return 200 and the type notification object if the type notification is created successfully', async () => {
        const mockTypeNotification = { 
            id: 1,
            name: 'New Type',
            description: 'New Description'
        };

        models.typenotification.findOne.mockResolvedValue(null);
        models.typenotification.create.mockResolvedValue(mockTypeNotification);

        const req = { 
            body: {
                name: 'New Type',
                description: 'New Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type notification created successfully',
            typenotification: mockTypeNotification
        });
    });

    it('should return 400 if the type notification already exists', async () => {
        const req = { 
            body: {
                name: 'Existing Type',
                description: 'Test Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findOne.mockResolvedValue({});

        await createTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type notification name already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                name: 'New Type',
                description: 'New Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findOne.mockRejectedValue(new Error('Database error'));

        await createTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllTypes function', () => {
    it('should return 200 and an array of types if types are found', async () => {
        const types = [
            { id: 1, name: 'Type 1', description: 'Description 1' },
            { id: 2, name: 'Type 2', description: 'Description 2' }
        ];

        models.typenotification.findAll.mockResolvedValue(types);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type notifications found successfully',
            types: types
        });
    });

    it('should return 404 if no types are found', async () => {
        models.typenotification.findAll.mockResolvedValue([]);

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

        models.typenotification.findAll.mockRejectedValue(new Error('Database error'));

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('editTypeNotification function', () => {
    it('should return 200 and the updated type notification if it exists and is successfully updated', async () => {
        const idtypenotification = '1';
        const updatedTypeData = {
            name: 'Updated Type',
            description: 'Updated Description'
        };
        
        // Mock do objeto typenotification
        const typenotification = {
            save: jest.fn().mockImplementation(async function() {
                return updatedTypeData;
            })
        };

        // Mock das funções de modelo
        models.typenotification.findByPk.mockResolvedValue(typenotification);
        models.typenotification.findOne.mockResolvedValue(null);

        const req = { 
            params: { idtypenotification: idtypenotification }, 
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Type notification updated successfully",
            typenotification: updatedTypeData
        });
    });

    it('should return 404 if the type notification does not exist', async () => {
        const req = { 
            params: { idtypenotification: 1 },
            body: {
                name: 'Updated Type',
                description: 'Updated Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findByPk.mockResolvedValue(null);

        await editTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type notification not found'
        });
    });

    it('should return 409 if the updated type notification name already exists', async () => {
        const req = { 
            params: { idtypenotification: 1 },
            body: {
                name: 'Updated Type',
                description: 'Updated Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const typenotification = { id: 1, name: 'Updated Type' };

        models.typenotification.findByPk.mockResolvedValue(typenotification);
        models.typenotification.findOne.mockResolvedValue({});

        await editTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type notification name already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { idtypenotification: 1 },
            body: {
                name: 'Updated Type',
                description: 'Updated Description'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findByPk.mockRejectedValue(new Error('Database error'));

        await editTypeNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});