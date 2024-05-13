const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const { createSeller, getSeller, getAllSellers, editSeller } = require('../controllers/seller.controller.js');

jest.mock('../models');

describe('createSeller function', () => {
    it('should return 200 and the seller object if the seller is created successfully', async () => {
        const mockRequestSeller = {
            id: 1,
            // propriedades do request seller
        };

        const mockCertificate = {
            id: 1,
            // propriedades do certificate
        };

        const mockSeller = { 
            id: 1,
            // propriedades do seller
        };

        models.requestseller.findByPk.mockResolvedValue(mockRequestSeller);
        models.certificate.findByPk.mockResolvedValue(mockCertificate);
        models.seller.create.mockResolvedValue(mockSeller);

        const req = { 
            body: {
                idrequest: 1,
                idcertificate: 1,
                userId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Seller created successfully',
            seller: mockSeller
        });
    });

    it('should return 422 if any field is empty', async () => {
        const req = { 
            body: {
                // campos vazios
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 404 if request seller or certificate not found', async () => {
        const req = { 
            body: {
                idrequest: 1,
                idcertificate: 1,
                userId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requestseller.findByPk.mockResolvedValue(null);
        models.certificate.findByPk.mockResolvedValue(null);

        await createSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Request Seller or Certificate not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                idrequest: 1,
                idcertificate: 1,
                userId: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.requestseller.findByPk.mockRejectedValue(new Error('Database error'));

        await createSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'

        });
    });
});

describe('getSeller function', () => {
    it('should return 200 and the seller object if seller is found', async () => {
        const mockSeller = { 
            id: 1,
            // propriedades do seller
        };

        models.seller.findByPk.mockResolvedValue(mockSeller);

        const req = { 
            params: { sellerId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Seller found successfully',
            seller: mockSeller
        });
    });

    it('should return 404 if seller is not found', async () => {
        const req = { 
            params: { sellerId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.seller.findByPk.mockResolvedValue(null);

        await getSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Seller not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { sellerId: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.seller.findByPk.mockRejectedValue(new Error('Database error'));

        await getSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('getAllSellers function', () => {
    it('should return 200 and an array of sellers if sellers are found', async () => {
        const mockSellers = [
            { id: 1, /* propriedades do seller */ },
            { id: 2, /* propriedades do seller */ }
        ];

        models.seller.findAll.mockResolvedValue(mockSellers);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Sellers found successfully',
            sellers: mockSellers
        });
    });

    it('should return 404 if no sellers are found', async () => {
        models.seller.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No sellers found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.seller.findAll.mockRejectedValue(new Error('Database error'));

        await getAllSellers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('editSeller function', () => {
    it('should return 200 and the updated seller if seller exists and is successfully updated', async () => {
        const sellerId = '1';
        const updatedSellerData = {
            idrequest: 1,
            idcertificate: 1,
            userId: 1
            // outras propriedades atualizadas
        };
        
        const mockSeller = {
            save: jest.fn().mockResolvedValue(updatedSellerData)
        };

        models.requestseller.findByPk.mockResolvedValue({});
        models.certificate.findByPk.mockResolvedValue({});
        models.seller.findByPk.mockResolvedValue(mockSeller);

        const req = { 
            params: { sellerId: sellerId }, 
            body: updatedSellerData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Seller updated successfully",
            seller: updatedSellerData
        });
    });

    it('should return 404 if the seller does not exist', async () => {
        const req = { 
            params: { sellerId: 1 },
            body: {
                idrequest: 1,
                idcertificate: 1,
                userId: 1
                // outras propriedades atualizadas
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.seller.findByPk.mockResolvedValue(null);

        await editSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Seller not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { sellerId: 1 },
            body: {
                idrequest: 1,
                idcertificate: 1,
                userId: 1
                // outras propriedades atualizadas
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.seller.findByPk.mockRejectedValue(new Error('Database error'));

        await editSeller(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});