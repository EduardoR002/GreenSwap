const express = require('express');
const models = require('../models');
const {createTokenUser} = require('../controllers/tokens.controller.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models');
jest.mock('bcrypt');

describe('createTokenUser function', () => {
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'mocked-token');
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a new token if no token exists for the user', async () => {
        const userId = 123;
        const email = 'test@example.com';
        const role = 'user';

        models.token.findOne = jest.fn().mockResolvedValue(null);

        const token = await createTokenUser(email, userId, role);

        expect(token).toBe('mocked-token');
        expect(models.token.findOne).toHaveBeenCalledWith({ where: { userId } });
        expect(models.token.create).toHaveBeenCalledWith({ userId, token: 'mocked-token', role });
    });
    it('should update the existing token if a token exists for the user', async () => {
        const userId = 123;
        const email = 'test@example.com';
        const role = 'user';

        const existingToken = { 
            userId: userId, 
            token: 'existing-token', 
            role: 'old-role',
            revoked: false,
            revokedAt: null,
            save: jest.fn().mockResolvedValue()
        };
        models.token.findOne = jest.fn().mockResolvedValue(existingToken);

        const token = await createTokenUser(email, userId, role);

        expect(token).toBe('mocked-token');
        expect(models.token.findOne).toHaveBeenCalledWith({ where: { userId } });
        expect(existingToken.token).toBe('mocked-token');
        expect(existingToken.role).toBe(role);
        expect(existingToken.revoked).toBe(false);
        expect(existingToken.revokedAt).toBe(null);
        expect(existingToken.save).toHaveBeenCalled();
        expect(models.token.create).not.toHaveBeenCalled();
    });

    it('should throw an error if an error occurs during token creation/update', async () => {
        const userId = 123;
        const email = 'test@example.com';
        const role = 'user';

        models.token.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(createTokenUser(email, userId, role)).rejects.toThrowError('Error at creating/updating token: Database error');
    });
})