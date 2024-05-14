const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Replace with your models path
const {
    createProposalState,
    getAllStates,
    editProposalState
} = require('../controllers/proposalstate.controller.js'); // Import the functions from the proposal state controller

jest.mock('../models');

describe('createProposalState function', () => {
    it('should return 200 and the created proposal state if successful', async () => {
        const mockProposalState = {
            id: 1,
            state: 'New State'
        };

        models.proposalstate.findOne.mockResolvedValue(null); // Mock database response to simulate no existing state
        models.proposalstate.create.mockResolvedValue(mockProposalState); // Mock database response to simulate successful creation

        const req = {
            body: {
                state: 'New State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProposalState(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(200); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'Proposal state created successfully',
            state: mockProposalState
        });
    });

    it('should return 409 if the proposal state already exists', async () => {
        const req = {
            body: {
                state: 'Existing State'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposalstate.findOne.mockResolvedValue({}); // Mock database response to simulate existing state

        await createProposalState(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(409); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'Proposal state already exists'
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

        models.proposalstate.findOne.mockRejectedValue(new Error('Database error')); // Mock database response to simulate error

        await createProposalState(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(500); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllStates function', () => {
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

        models.proposalstate.findAll.mockResolvedValue(states); // Mock database response to simulate finding states

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllStates(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(200); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'Proposal states found successfully',
            states: states
        });
    });

    it('should return 404 if no states are found', async () => {
        models.proposalstate.findAll.mockResolvedValue([]); // Mock database response to simulate no states found

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllStates(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(404); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'No states found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposalstate.findAll.mockRejectedValue(new Error('Database error')); // Mock database response to simulate error

        await getAllStates(req, res); // Call the function being tested

        expect(res.status).toHaveBeenCalledWith(500); // Verify the response status
        expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
    describe('editProposalState function', () => {
        it('should return 200 and the updated proposal state if it exists and is successfully updated', async () => {
            const idState = '1';
            const updatedStateData = {
                state: 'Updated State'
            };
    
            const state = {
                save: jest.fn().mockResolvedValue(updatedStateData) // Mock the save function of the state object to return the updated state data
            };
    
            models.proposalstate.findByPk.mockResolvedValue(state); // Mock database response to simulate finding the state
            models.proposalstate.findOne.mockResolvedValue(null); // Mock database response to simulate no existing state with the updated state data
    
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
    
            await editProposalState(req, res); // Call the function being tested
    
            expect(res.status).toHaveBeenCalledWith(200); // Verify the response status
            expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
                message: "Proposal state updated successfully",
                state: updatedStateData
            });
        });
    
        it('should return 404 if the proposal state does not exist', async () => {
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
    
            models.proposalstate.findByPk.mockResolvedValue(null); // Mock database response to simulate no existing state
    
            await editProposalState(req, res); // Call the function being tested
    
            expect(res.status).toHaveBeenCalledWith(404); // Verify the response status
            expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
                message: 'Proposal state not found'
            });
        });
    
        it('should return 409 if the updated proposal state already exists', async () => {
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
    
            models.proposalstate.findByPk.mockResolvedValue(state); // Mock database response to simulate finding the existing state
            models.proposalstate.findOne.mockResolvedValue({}); // Mock database response to simulate existing state with the updated state data
    
            await editProposalState(req, res); // Call the function being tested
    
            expect(res.status).toHaveBeenCalledWith(409); // Verify the response status
            expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
                message: 'Proposal state already exists'
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
    
            models.proposalstate.findByPk.mockRejectedValue(new Error('Database error')); // Mock database response to simulate error
    
            await editProposalState(req, res); // Call the function being tested
    
            expect(res.status).toHaveBeenCalledWith(500); // Verify the response status
            expect(res.json).toHaveBeenCalledWith({ // Verify the response JSON
                message: 'Something went wrong',
                error: expect.any(Error)
            });
        });
    });
});
