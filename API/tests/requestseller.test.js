const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Replace with the path to your models
const { createRequestSeller, getAllRequestSellers,editRequestSeller } = require('../controllers/requestseller.controller.js');

jest.mock('../models');

describe('createRequestSeller function', () => {
    it('should return 200 and the created request seller if successful', async () => {
        const mockUser = {
            id: 1,
            // user properties...
        };

        const mockRequestState = {
            id: 1,
            // request state properties...
        };

        const mockRequestSeller = {
            id: 1,
            nif: '123456789',
            description: 'Lorem ipsum',
            photo: 'photo-url.jpg',
            idstate: 1,
            iduser: 1,
            // request seller properties...
        };

        models.user.findByPk.mockResolvedValue(mockUser);
        models.requeststate.findByPk.mockResolvedValue(mockRequestState);
        models.requestseller.create.mockResolvedValue(mockRequestSeller);

        const req = { 
            body: {
                nif: '123456789',
                description: 'Lorem ipsum',
                photo: 'photo-url.jpg',
                idstate: 1,
                iduser: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request seller created successfully',
            requestSeller: mockRequestSeller
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = { 
            body: {
                // Missing required fields
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Description, Nif, IdState, and IdUser are necessary'
        });
    });

    it('should return 404 if user or request state does not exist', async () => {
        const req = { 
            body: {
                nif: '123456789',
                description: 'Lorem ipsum',
                photo: 'photo-url.jpg',
                idstate: 1,
                iduser: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.user.findByPk.mockResolvedValue(null);
        models.requeststate.findByPk.mockResolvedValue(null);

        await createRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                nif: '123456789',
                description: 'Lorem ipsum',
                photo: 'photo-url.jpg',
                idstate: 1,
                iduser: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.user.findByPk.mockRejectedValue(new Error('Database error'));

        await createRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('getAllRequestSellers function', () => {
    it('should return 200 and an array of request sellers if found', async () => {
        const mockRequestSellers = [
            {
                id: 1,
                // request seller properties...
            },
            {
                id: 2,
                // request seller properties...
            }
        ];

        models.requestseller.findAll.mockResolvedValue(mockRequestSellers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllRequestSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request sellers found successfully',
            requestSellers: mockRequestSellers
        });
    });

    it('should return 404 if no request sellers are found', async () => {
        models.requestseller.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllRequestSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No request sellers found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requestseller.findAll.mockRejectedValue(new Error('Database error'));

        await getAllRequestSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('editRequestSeller function', () => {
    it('should return 200 and success message if request seller is updated successfully', async () => {
        
    });

    /*it('should return 404 if request seller does not exist', async () => {
        const req = { 
            params: { idrequestseller: 1 },
            body: {
                // request seller update data...
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requestseller.findByPk.mockResolvedValue(null);

        await editRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request seller not found'
        });
    });

    it('should return 404 if request state does not exist', async () => {
        const mockRequestSeller = {
            id: 1,
            nif: '123456789',
            description: 'Lorem ipsum',
            photo: 'photo-url.jpg',
            idstate: 1,
            iduser: 1,
            // request seller properties...
        };
    
        models.requestseller.findByPk.mockResolvedValue(mockRequestSeller);
        models.requeststate.findByPk.mockResolvedValue(null);
    
        const req = { 
            params: { id: 1 },
            body: {
                // request seller update data...
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await editRequestSeller(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request state not found'
        });
    });
    
    it('should return 422 if request state is not pending', async () => {
        const mockRequestSeller = {
            id: 1,
            nif: '123456789',
            description: 'Lorem ipsum',
            photo: 'photo-url.jpg',
            idstate: 2, // Assuming state is not pending
            iduser: 1,
            // request seller properties...
        };

        const mockRequestState = {
            id: 2,
            status: 'approved',
            // request state properties...
        };

        models.requestseller.findByPk.mockResolvedValue(mockRequestSeller);
        models.requeststate.findByPk.mockResolvedValue(mockRequestState);

        const req = { 
            params: { id: 1 },
            body: {
                // request seller update data...
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Cannot edit request seller. Request state is not pending.'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { id: 1 },
            body: {
                // request seller update data...
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requestseller.findByPk.mockRejectedValue(new Error('Database error'));

        await editRequestSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });*/
});