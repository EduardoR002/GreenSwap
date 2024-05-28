const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const controller = require('../controllers/proposal.controller.js');

jest.mock('../models');

describe('createDirectProposal function', () => {
    it('should create a direct proposal', async () => {
        // Mock request and response objects
        const req = { 
            body: {
                newprice: 10,
                idproduct: 1,
                iduser: 1,
                quantity: 5
            } 
        };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };
    
        // Mock sequelize.query function to return a valid result
        models.sequelize.query.mockResolvedValueOnce([{ message: "Proposal created successfully" }]);
    
        // Call the function
        await controller.createDirectProposal(req, res);
    
        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Proposal created successfully" });
    });

    it('should return error if price or quantity is not greater than zero', async () => {
        // Mock request and response objects with invalid data
        const req = { 
            body: {
                newprice: 0,
                idproduct: 1,
                iduser: 1,
                quantity: -1
            } 
        };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        // Call the function
        await controller.createDirectProposal(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: "Price or quantity must be greater than zero" });
    });

    it('should return error if database query fails', async () => {
        // Mock request and response objects
        const req = { 
            body: {
                newprice: 10,
                idproduct: 1,
                iduser: 1,
                quantity: 5
            } 
        };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        // Mock sequelize.query function to simulate database query failure
        models.sequelize.query.mockRejectedValueOnce(new Error('Database query failed'));

        // Call the function
        await controller.createDirectProposal(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Something went wrong", error: "Database query failed" });
    });

    it('should return unknown error message if result is falsy', async () => {
        // Mock request and response objects
        const req = { 
            body: {
                newprice: 10,
                idproduct: 1,
                iduser: 1,
                quantity: 5
            } 
        };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };
    
        // Mock sequelize.query function to return falsy result
        models.sequelize.query.mockResolvedValueOnce(null);
    
        // Call the function
        await controller.createDirectProposal(req, res);
    
        // Assertions
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Unknown error occurred" });
    });
    
    it('should return unknown error message if result array is empty', async () => {
        // Mock request and response objects
        const req = { 
            body: {
                newprice: 10,
                idproduct: 1,
                iduser: 1,
                quantity: 5
            } 
        };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };
    
        // Mock sequelize.query function to return empty array
        models.sequelize.query.mockResolvedValueOnce([]);
    
        // Call the function
        await controller.createDirectProposal(req, res);
    
        // Assertions
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Unknown error occurred" });
    });
});