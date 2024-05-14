const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const { createCertifier, getCertifier, getAllCertifiers, editCertifier } = require('../controllers/certifier.controller.js');

jest.mock('../models');

describe('createCertifier function', () => {
    it('should return 200 and the created certifier if successful', async () => {
        const mockCertifier = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password'
        };

        models.certifier.findOne.mockResolvedValue(null);
        models.certifier.create.mockResolvedValue(mockCertifier);

        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifier created successfully',
            certifier: mockCertifier
        });
    });

    it('should return 409 if the email already exists', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findOne.mockResolvedValue({});

        await createCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findOne.mockRejectedValue(new Error('Database error'));

        await createCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getCertifier function', () => {
    it('should return 200 and the certifier data if found', async () => {
        const mockCertifier = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password'
        };

        models.certifier.findOne.mockResolvedValue(mockCertifier);

        const req = {
            params: {
                certifierId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifier found successfully',
            certifier: mockCertifier
        });
    });

    it('should return 404 if the certifier is not found', async () => {
        models.certifier.findOne.mockResolvedValue(null);

        const req = {
            params: {
                certifierId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifier not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                certifierId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findOne.mockRejectedValue(new Error('Database error'));

        await getCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllCertifiers function', () => {
    it('should return 200 and an array of certifiers if found', async () => {
        const certifiers = [{
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password'
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password'
            }
        ];

        models.certifier.findAll.mockResolvedValue(certifiers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCertifiers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifiers found successfully',
            certifiers: certifiers
        });
    });

    it('should return 404 if no certifiers are found', async () => {
        models.certifier.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCertifiers(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No certifiers found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findAll.mockRejectedValue(new Error('Database error'));

        await getAllCertifiers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('editCertifier function', () => {
    it('should return 200 and the updated certifier data if it exists and is successfully updated', async () => {
        const certifierId = '1';
        const updatedCertifierData = {
            name: 'Updated Name',
            email: 'updated@example.com',
            password: 'updatedPassword'
        };

        const certifier = {
            save: jest.fn().mockResolvedValue(updatedCertifierData)
        };

        models.certifier.findByPk.mockResolvedValue(certifier);
        models.certifier.findOne.mockResolvedValue(null);

        const req = {
            params: {
                certifierId: certifierId
            },
            body: updatedCertifierData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Certifier updated successfully",
            certifier: updatedCertifierData
        });
    });

    it('should return 404 if the certifier does not exist', async () => {
        const req = {
            params: {
                certifierId: 1
            },
            body: {
                name: 'Updated Name',
                email: 'updated@example.com',
                password: 'updatedPassword'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findByPk.mockResolvedValue(null);

        await editCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifier not found'
        });
    });

    it('should return 409 if the updated email already exists for another certifier', async () => {
        const req = {
            params: {
                certifierId: 1
            },
            body: {
                name: 'Updated Name',
                email: 'existing@example.com',
                password: 'updatedPassword'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const certifier = {
            id: 1,
            email: 'existing@example.com'
        };
    
        models.certifier.findByPk.mockResolvedValue(certifier);
        models.certifier.findOne.mockResolvedValue({ id: 2 }); // Simulate another certifier with the same email
    
        await editCertifier(req, res);
    
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                certifierId: 1
            },
            body: {
                name: 'Updated Name',
                email: 'updated@example.com',
                password: 'updatedPassword'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.certifier.findByPk.mockRejectedValue(new Error('Database error'));

        await editCertifier(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});