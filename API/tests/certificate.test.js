const request = require('supertest');
const app = require('../app'); // assuming your app is defined in a separate file called app.js
const models = require('../models');
const {createCertificate,getAllCertificates} = require('../controllers/certificate.controller.js');
jest.mock('../models');

// Group of unit tests that test the function CreateCertificate
describe('createCertificate function', () => {
    it('should return 200 and the created certificate if successful', async () => {
        const mockCertificate = {
            id: 1,
            certificate: 'Certificate A',
            idcertifier: 1
        };

        models.certifier.findByPk.mockResolvedValue({}); // mock to simulate existing certifier
        models.certificate.create.mockResolvedValue(mockCertificate);

        const req = {
            body: {
                certificate: 'Certificate A',
                idcertifier: 1 // mock to simulate existing certifier
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createCertificate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certificate created successfully',
            certificate: mockCertificate
        });
    });

    it('should return 422 if any field is empty', async () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createCertificate(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 404 if the certifier does not exist', async () => {
        models.certifier.findByPk.mockResolvedValue(null);

        const req = {
            body: {
                certificate: 'Certificate A',
                idcertifier: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createCertificate(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certifier not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        models.certifier.findByPk.mockRejectedValue(new Error('Database error'));

        const req = {
            body: {
                certificate: 'Certificate A',
                idcertifier: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createCertificate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

// Group of unit tests that test the function getAllCertificates
describe('getAllCertificates function', () => {
    it('should return 200 and an array of certificates if found', async () => {
        const certificates = [{
                id: 1,
                certificate: 'Certificate A',
                idcertifier: 1
            },
            {
                id: 2,
                certificate: 'Certificate B',
                idcertifier: 2
            }
        ];

        models.certificate.findAll.mockResolvedValue(certificates);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCertificates(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Certificates found successfully',
            certificates: certificates
        });
    });

    it('should return 404 if no certificates are found', async () => {
        models.certificate.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCertificates(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No certificates found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        models.certificate.findAll.mockRejectedValue(new Error('Database error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllCertificates(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});