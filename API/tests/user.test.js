const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // replace with your models path
const { createUser, getUser } = require('../controllers/user.controller.js');
const bcrypt = require('bcrypt');

jest.mock('../models');
jest.mock('bcrypt');

describe('getUser function', () => {
    it('should return 200 and the user object if the user is found', async () => {
        const mockUser = { 
            idUser: '1',
            name: 'John Doe',
            email: 'john@gmail.com',
            password: 'john123',
            phone: '123456789',
            address: 'Rua do Teste',
            description: 'Testing getUser',
        };
        models.user.findOne.mockResolvedValue(mockUser);

        const req = { 
            params: {
                userId: '1'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getUser(req, res); // Ensure to await the function call

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User found successfully',
            user: mockUser
        });
    });

    it('should return 404 if the user is not found', async () => {
        models.user.findOne.mockResolvedValue(null);

        const req = { 
            params: {
                userId: '1'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getUser(req, res); // Ensure to await the function call

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found'
        });
    });
});

describe('createUser function', () => {
    it('should return 200 and the user object if the user is created successfully', async () => {
        const mockUser = { 
            idUser: 1, 
            name: 'John Doe', 
            email: 'johndoe@example.com', 
            phone: '123456789', 
            address: '123 Main St' };

        bcrypt.hash.mockResolvedValue('hashedPassword');
        models.user.findOne.mockResolvedValue(null);
        models.user.create.mockResolvedValue(mockUser);

        const req = { 
            body: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                phone: '123456789',
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createUser(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User created successfully',
            user: mockUser
        });
    });
});