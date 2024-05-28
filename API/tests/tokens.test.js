const express = require('express');
const models = require('../models');
const controller = require('../controllers/tokens.controller.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models');
jest.mock('bcrypt');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}));

describe('createToken function', () => {
    it('should create a token and store it in the database', async () => {
        // Mock JWT sign function
        jwt.sign.mockReturnValue('generatedToken');

        // Mock models.token.create function
        models.token.create.mockResolvedValue({ token: 'generatedToken' });

        // Call the function
        const token = await controller.createToken(1, 'user');

        // Assertions
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1, role: 'user' }, expect.any(String), { expiresIn: '1h' });
        expect(models.token.create).toHaveBeenCalledWith({ token: 'generatedToken' });
        expect(token).toBe('generatedToken');
    });
});

describe('deleteToken function', () => {
    it('should delete a token from the database', async () => {
        // Mock models.token.destroy function
        models.token.destroy.mockResolvedValue(1);

        // Create mock response object
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        // Call the function
        await controller.deleteToken({ body: { token: 'someToken' } }, res);

        // Assertions
        expect(models.token.destroy).toHaveBeenCalledWith({ where: { token: 'someToken' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });

    it('should return 404 if token not found', async () => {
        // Mock models.token.destroy function
        models.token.destroy.mockResolvedValue(0);

        // Create mock response object
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        // Call the function
        await controller.deleteToken({ body: { token: 'nonExistentToken' } }, res);

        // Assertions
        expect(models.token.destroy).toHaveBeenCalledWith({ where: { token: 'nonExistentToken' } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Token not found" });
    });
});