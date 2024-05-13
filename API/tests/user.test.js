const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // replace with your models path
const { createUser, getUser, getAllUsers } = require('../controllers/user.controller.js');
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
    
    it('sould return 422 if the phone number dont have 9 digits', async () => {
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
                phone: '123',
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Phone number must be 9 digits long',
        });
    });

    it('should return 409 if the email already exists', async () => {
        const req = { 
            body: {
                name: 'John Doe',
                email: 'existingemail@example.com',
                password: 'password123',
                phone: '123456789',
                address: '123 Main St'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.user.findOne.mockResolvedValueOnce({ email: 'existingemail@example.com' });

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists',
        });
    });

    it('should return 409 if the phone number already exists', async () => {
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

        models.user.findOne.mockResolvedValueOnce({ phone: '123456789' });

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Phone number already exists',
        });
    });
});

describe('getAllUsers function', () => {
    it('should return 200 and an array of users if users are found', async () => {
        const mockUsers = [
            { idUser: 1, name: 'John Doe', email: 'john@example.com' },
            { idUser: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ];

        models.user.findAll.mockResolvedValue(mockUsers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Users found successfully',
            users: mockUsers
        });
    });

    it('should return 404 if no users are found', async () => {
        models.user.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No users found'
        });
    });
})

