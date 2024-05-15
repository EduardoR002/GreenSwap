const express = require('express');
const models = require('../models');
const {createTokenUser, createTokenCertifier, removeRevokedTokens, revokeExpiredOrUnrenewedTokens} = require('../controllers/tokens.controller.js');
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

        const createdAt = new Date();
        const updatedAt = new Date();
        models.token.create = jest.fn().mockResolvedValue({
            tokenid: 1,
            userId,
            token: 'mocked-token',
            revokedAt: null,
            revoked: false,
            createdAt,
            updatedAt,
            role
        });

        const token = await createTokenUser(email, userId, role);

        expect(token).toEqual('mocked-token');
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

        expect(token).toEqual('mocked-token');
        expect(models.token.findOne).toHaveBeenCalledWith({ where: { userId } });
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

describe('createTokenCertifier function', () => {
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'mocked-token');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new token if no token exists for the certifier', async () => {
        const idCertifier = 456;
        const email = 'test@example.com';
        const role = 'certifier';

        models.token.findOne = jest.fn().mockResolvedValue(null);

        const token = await createTokenCertifier(email, idCertifier, role);

        expect(token).toBe('mocked-token');
        expect(models.token.findOne).toHaveBeenCalledWith({ where: { idcertifier: idCertifier } });
        expect(models.token.create).toHaveBeenCalledWith({ idcertifier: idCertifier, token: 'mocked-token', role });
    });

    it('should update the existing token if a token exists for the certifier', async () => {
        const idCertifier = 456;
        const email = 'test@example.com';
        const role = 'certifier';

        const existingToken = { 
            idcertifier: idCertifier, 
            token: 'existing-token', 
            role: 'old-role',
            revoked: false,
            revokedAt: null,
            save: jest.fn().mockResolvedValue()
        };
        models.token.findOne = jest.fn().mockResolvedValue(existingToken);

        const token = await createTokenCertifier(email, idCertifier, role);

        expect(token).toBe('mocked-token');
        expect(models.token.findOne).toHaveBeenCalledWith({ where: { idcertifier: idCertifier } });
        expect(existingToken.token).toBe('mocked-token');
        expect(existingToken.role).toBe(role);
        expect(existingToken.revoked).toBe(false);
        expect(existingToken.revokedAt).toBe(null);
        expect(existingToken.save).toHaveBeenCalled();
        expect(models.token.create).not.toHaveBeenCalled();
    });

    it('should throw an error if an error occurs during token creation/update', async () => {
        const idCertifier = 456;
        const email = 'test@example.com';
        const role = 'certifier';

        models.token.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(createTokenCertifier(email, idCertifier, role)).rejects.toThrowError('Error at creating/updating token: Database error');
    });
});

describe('removeRevokedTokens function', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks before each test
    });

    it('should remove revoked tokens older than 6 hours', async () => {
        jest.mock('../models', () => {
            const tokenModelMock = {
                findAll: jest.fn(),
            };
            return { token: tokenModelMock };
        });
        // Mock the tokens data
        const tokens = [
            { id: 1, token: 'token1', revoked: true, revokedAt: new Date('2024-05-13T10:00:00Z') },
            { id: 2, token: 'token2', revoked: true, revokedAt: new Date('2024-05-13T03:00:00Z') },
            { id: 3, token: 'token3', revoked: false, revokedAt: null },
            { id: 4, token: 'token4', revoked: true, revokedAt: new Date() }
        ];
        // Mock the findAll method to return the tokens
        const tokenModelMock = require('../models').token;
        tokenModelMock.findAll.mockResolvedValue(tokens);

        // Mock the destroy method of token instances
        const destroyMock = jest.fn();
        tokens.forEach(token => {
            token.destroy = destroyMock;
        });

        // Call the function
        await removeRevokedTokens();

        jest.useFakeTimers();

        // Assertions
        expect(tokenModelMock.findAll).toHaveBeenCalled();
        expect(destroyMock).toHaveBeenCalledTimes(2); // Only tokens 1 and 2 should be destroyed
        expect(destroyMock).toHaveBeenCalledWith();
        expect(destroyMock).toHaveBeenCalledWith();
    });

    it('should not remove any tokens if none are revoked', async () => {
        // Mocking the findAll function to return an array of tokens (none revoked)
        const tokens = [
            { id: 1, token: 'token1', revoked: false, revokedAt: null },
            { id: 2, token: 'token2', revoked: false, revokedAt: null }
        ];
        models.token.findAll = jest.fn().mockResolvedValue(tokens);

        // Mocking the destroy function of the token instances
        const destroyMock = jest.fn();
        tokens.forEach(token => {
            token.destroy = destroyMock;
        });

        await removeRevokedTokens();

        // Expectations
        expect(models.token.findAll).toHaveBeenCalled();
        expect(destroyMock).not.toHaveBeenCalled(); // No tokens should be destroyed
    });

    it('should handle errors gracefully', async () => {
        const idCertifier = 456;
        const email = 'test@example.com';
        const role = 'certifier';

        models.token.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

        await expect(createTokenCertifier(email, idCertifier, role)).rejects.toThrowError('Error at creating/updating token: Database error');
    });
});

describe('revokeExpiredOrUnrenewedTokens function', () => {
    
});