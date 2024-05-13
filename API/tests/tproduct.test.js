const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const { createTypeProduct, getAllTypes, editTypeProduct } = require('../controllers/tProduct.controller.js');

jest.mock('../models');

describe('createTypeProduct function', () => {
    it('should return 200 and the type product object if the type product is created successfully', async () => {
        const mockTypeProduct = { 
            id: 1,
            typeproduct: 'New Type'
        };

        models.typeproduct.findOne.mockResolvedValue(null);
        models.typeproduct.create.mockResolvedValue(mockTypeProduct);

        const req = { 
            body: {
                typeproduct: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type product created successfully',
            typeproduct: mockTypeProduct
        });
    });

    it('should return 409 if the type product already exists', async () => {
        const req = { 
            body: {
                typeproduct: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findOne.mockResolvedValue({});

        await createTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type product already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            body: {
                typeproduct: 'New Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findOne.mockRejectedValue(new Error('Database error'));

        await createTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllTypes function', () => {
    it('should return 200 and an array of types if types are found', async () => {
        const types = [
            { id: 1, typeproduct: 'Type 1' },
            { id: 2, typeproduct: 'Type 2' }
        ];

        models.typeproduct.findAll.mockResolvedValue(types);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type products found successfully',
            types: types
        });
    });

    it('should return 404 if no types are found', async () => {
        models.typeproduct.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No types found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findAll.mockRejectedValue(new Error('Database error'));

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('editTypeProduct function', () => {
    it('should return 200 and the updated type product if it exists and is successfully updated', async () => {
        const idtypeproduct = '1';
        const updatedTypeData = {
            typeproduct: 'Updated Type Product'
        };
        
        // Mock do objeto typeproduct
        const typeproduct = {
            save: jest.fn().mockImplementation(async function() {
                return updatedTypeData;
            })
        };

        // Mock das funções de modelo
        models.typeproduct.findByPk.mockResolvedValue(typeproduct);
        models.typeproduct.findOne.mockResolvedValue(null);

        const req = { 
            params: { idtypeproduct: idtypeproduct }, 
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Type product updated successfully",
            typeproduct: updatedTypeData
        });
    });

    it('should return 404 if the type product does not exist', async () => {
        const req = { 
            params: { idtypeproduct: 1 },
            body: {
                typeproduct: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findByPk.mockResolvedValue(null);

        await editTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type product not found'
        });
    });

    it('should return 409 if the updated type product already exists', async () => {
        const req = { 
            params: { idtypeproduct: 1 },
            body: {
                typeproduct: 'Existing Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const typeproduct = { id: 1, typeproduct: 'Existing Type' };

        models.typeproduct.findByPk.mockResolvedValue(typeproduct);
        models.typeproduct.findOne.mockResolvedValue({});

        await editTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type product already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = { 
            params: { idtypeproduct: 1 },
            body: {
                typeproduct: 'Updated Type'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typeproduct.findByPk.mockRejectedValue(new Error('Database error'));

        await editTypeProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});