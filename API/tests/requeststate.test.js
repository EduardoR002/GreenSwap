const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Replace with the path to your models
const { createRequestState, getAllRequestStates, editRequestState } = require('../controllers/requeststate.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createRequestState
describe('createRequestState function', () => {
    it('should return 200 and the request state object if the request state is created successfully', async () => {
        const mockRequestState = { 
            id: 1,
            state: 'New State'
        };

        models.requeststate.findOne.mockResolvedValue(null);
        models.requeststate.create.mockResolvedValue(mockRequestState);

        const req = { 
            body: {
                state: 'New State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request state created successfully',
            state: mockRequestState
        });
    });

    it('should return 409 if the request state already exists', async () => {
        const req = { 
            body: {
                state: 'Existing State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requeststate.findOne.mockResolvedValue({});

        await createRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request state already exists'
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

        models.requeststate.findOne.mockRejectedValue(new Error('Database error'));

        await createRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

// Group of unit tests that test the function getAllRequestStates
describe('getAllRequestStates function', () => {
    it('should return 200 and an array of request states if request states are found', async () => {
        const requestStates = [
            { id: 1, state: 'State 1' },
            { id: 2, state: 'State 2' }
        ];

        models.requeststate.findAll.mockResolvedValue(requestStates);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllRequestStates(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request states found successfully',
            states: requestStates
        });
    });

    it('should return 404 if no request states are found', async () => {
        models.requeststate.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllRequestStates(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No request states found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requeststate.findAll.mockRejectedValue(new Error('Database error'));

        await getAllRequestStates(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

// Group of unit tests that test the function editRequestState
describe('editRequestState function', () => {
    it('should return 200 and the updated request state if it exists and is successfully updated', async () => {
        const idState = '1';
        const updatedStateData = {
            state: 'Updated State'
        };
        
        // Mock the request state object
        const requestState = {
            save: jest.fn().mockImplementation(async function() {
                return updatedStateData;
            })
        };

        // Mock the model functions
        models.requeststate.findByPk.mockResolvedValue(requestState);
        models.requeststate.findOne.mockResolvedValue(null);

        const req = { 
            params: { idState: idState }, 
            body: updatedStateData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Request state updated successfully",
            state: updatedStateData
        });
    });

    it('should return 404 if the request state does not exist', async () => {
        const req = { 
            params: { idState: 1 },
            body: {
                state: 'Updated State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requeststate.findByPk.mockResolvedValue(null);

        await editRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request state not found'
        });
    });

    it('should return 409 if the updated request state already exists', async () => {
        const req = { 
            params: { idState: 1 },
            body: {
                state: 'Existing State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const requestState = { id: 1, state: 'Existing State' };

        models.requeststate.findByPk.mockResolvedValue(requestState);
        models.requeststate.findOne.mockResolvedValue({});

        await editRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request state already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { idState: 1 },
            body: {
                state: 'Updated State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requeststate.findByPk.mockRejectedValue(new Error('Database error'));

        await editRequestState(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});