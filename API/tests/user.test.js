const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const { createUser, getUser, getAllUsers, deleteUser, editUser, loginUser} = require('../controllers/user.controller.js');
const bcrypt = require('bcrypt');

jest.mock('../models');
jest.mock('bcrypt');

const createTokenUser = jest.fn();

// Group of unit tests that test the function getUser
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

// Group of unit tests that test the function createUser
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

// Group of unit tests that test the function getAllUsers
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

// Group of unit tests that test the function deleteUser
describe('deleteUser function', () => {
    it('should return 200 and success message if user is deleted successfully', async () => {
        const userId = '1';
        models.user.destroy.mockResolvedValue(1); // Assuming one row is deleted

        const req = { params: { userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User deleted successfully'
        });
    });

    it('should return 404 if user is not found', async () => {
        const userId = '1';
        models.user.destroy.mockResolvedValue(0); // Assuming no rows are deleted

        const req = { params: { userId } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found'
        });
    });
});

// Group of unit tests that test the function editUser
describe('editUser function', () => {
    it('should return 200 and success message if user is updated successfully', async () => {
        const userId = '1';
        const updatedUserData = {
            name: 'Updated Name',
            email: 'updatedemail@example.com',
            phone: '123456789',
            address: 'Updated Address'
        };
        const user = {
            idUser: userId,
            name: 'Original Name',
            email: 'original@example.com',
            phone: '987654321',
            address: 'Original Address',
            save: jest.fn().mockResolvedValue()
        };
        models.user.findByPk.mockResolvedValue(user);
        models.user.findOne.mockResolvedValue(null);
        user.save.mockResolvedValue(user);

        const req = {
            params: { userId },
            body: updatedUserData
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User updated successfully',
            user
        });
    });

    it('should return 404 if user is not found', async () => {
        const userId = '1';
        models.user.findByPk.mockResolvedValue(null);

        const updatedUserData = {
            name: 'Updated Name',
            email: 'updatedemail@example.com',
            phone: '123456789',
            address: 'Updated Address'
        };

        const req = {
            params: { userId },
            body: updatedUserData
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found'
        });
    });

    it('should return 409 if email already exists', async () => {
        const userId = '1';
        const updatedUserData = {
            email: 'existingemail@example.com'
        };
        const user = {
            idUser: userId,
            name: 'Original Name',
            email: 'original@example.com',
            phone: '123456789',
            address: 'Original Address'
        };
        const existingUser = {
            idUser: '2',
            name: 'Existing Name',
            email: 'existingemail@example.com',
            phone: '987654321',
            address: 'Existing Address'
        };
        models.user.findByPk.mockResolvedValue(user);
        models.user.findOne.mockResolvedValue(existingUser);

        const req = {
            params: { userId },
            body: {email: 'existingemail@example.com', phone: '123456789'}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists'
        });
    });

    it('should return 409 if phone already exists', async () => {
        const userId = '1';
        const updatedUserData = {
            phone: '123456789'
        };
        const user = {
            idUser: userId,
            name: 'Original Name',
            email: 'original@example.com',
            phone: '123456789',
            address: 'Original Address'
        };
        const existingUser = {
            idUser: '2',
            name: 'Existing Name',
            email: 'existing@example.com',
            phone: '123456789',
            address: 'Existing Address'
        };
        models.user.findByPk.mockResolvedValue(user);
        models.user.findOne.mockResolvedValue(existingUser);

        const req = {
            params: { userId },
            body: updatedUserData
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Phone already exists'
        });
    });

    it('should return 422 if phone number is not 9 digits long', async () => {
        const userId = '1';
        const updatedUserData = {
            phone: '123'
        };
        const user = {
            idUser: userId,
            name: 'Original Name',
            email: 'original@example.com',
            phone: '123456789',
            address: 'Original Address'
        };
        models.user.findByPk.mockResolvedValue(user);

        const req = {
            params: { userId },
            body: updatedUserData
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Phone number must be 9 digits long'
        });
    });
})

// Group of unit tests that test the function loginUser
describe('loginUser function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return 200 and success message for user login with correct credentials', async () => {
        const mockUser = {
            idUser: 1,
            email: 'user@example.com',
            password: 'password123'
        };

        const findOneMock = jest.fn();

        models.user.findOne = findOneMock;

        const originalFindOne = findOneMock.mockImplementation(() => {
            return mockUser;
        })

        models.seller.findOne.mockResolvedValue(null);
        bcrypt.compare.mockResolvedValue('hashedPassword');

        const req = {
            body: {
                email: 'user@example.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn()
        };

        await loginUser(req, res);

        expect(originalFindOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token: expect.any(String),
            user: mockUser
        });
        expect(res.cookie).toHaveBeenCalledWith('token', expect.any(String), {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
    });

    it('should return 200 and success message for certifier login with correct credentials', async () => {
        const mockCertifier = {
            idcertifier: 1,
            email: 'certifier@example.com',
            password: 'password123'
        };

        models.user.findOne.mockResolvedValue(null);

        const findOneMock = jest.fn();

        models.user.findOne = findOneMock;

        const originalFindOne = findOneMock.mockImplementation(() => {
            return mockCertifier;
        })

        const req = {
            body: {
                email: 'certifier@example.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn()
        };

        await loginUser(req, res);

        expect(originalFindOne).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            token: expect.any(String),
            user: mockCertifier
        });
        expect(res.cookie).toHaveBeenCalledWith('token', expect.any(String), {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        });
    });

    it('should return 401 for user login with incorrect password', async () => {
        mockedUser = {
            idUser: 1,
            email: 'user@example.com',
            password: await bcrypt.hash('password123', 10)
        }
        
        models.user.findOne.mockResolvedValue(mockedUser)
        bcrypt.compare.mockResolvedValue(false)

        const req = {
            body: {
                email: 'user@example.com',
                password: 'wrongpassword' 
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Incorrect password'
        });
    });

    it('should return 404 if user is not found', async () => {
        models.user.findOne.mockResolvedValue(null);

        const req = {
            body: {
                email: 'nonexistent@example.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User not found'
        });
    });
})