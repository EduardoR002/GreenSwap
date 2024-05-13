const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // Substitua pelo caminho dos seus modelos
const {createTypeProposal,getAllTypes,editTypeProposal} = require('../controllers/proposaltype.controller.js');

jest.mock('../models');

describe('createTypeProposal function', () => {
    it('should return 200 and the created type proposal if successful', async () => {
        const mockTypeProposal = {
            id: 1,
            proposaltype: 'Type A'
        };

        models.proposaltype.findOne.mockResolvedValue(null);
        models.proposaltype.create.mockResolvedValue(mockTypeProposal);

        const req = {
            body: {
                proposaltype: 'Type A'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal created successfully',
            type: mockTypeProposal
        });
    });

    it('should return 409 if the type proposal already exists', async () => {
        const req = {
            body: {
                proposaltype: 'Type A'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposaltype.findOne.mockResolvedValue({});
        models.proposaltype.create.mockResolvedValue(null);

        await createTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                proposaltype: 'Type A'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposaltype.findOne.mockRejectedValue(new Error('Database error'));

        await createTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('getAllTypes function', () => {
    it('should return 200 and an array of types if found', async () => {
        const types = [{
                id: 1,
                proposaltype: 'Type A'
            },
            {
                id: 2,
                proposaltype: 'Type B'
            }
        ];

        models.proposaltype.findAll.mockResolvedValue(types);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal found successfully',
            types: types
        });
    });

    it('should return 404 if no types are found', async () => {
        models.proposaltype.findAll.mockResolvedValue([]);

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
        models.proposaltype.findAll.mockRejectedValue(new Error('Database error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllTypes(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});

describe('editTypeProposal function', () => {
    it('should return 200 and the updated type proposal if it exists and is successfully updated', async () => {
        const typeId = '1';
        const updatedTypeData = {
            proposaltype: 'Type B'
        };
    
        const type = {
            save: jest.fn().mockResolvedValue(updatedTypeData)
        };
    
        models.proposaltype.findByPk.mockResolvedValue(type);
    
        const req = {
            params: {
                idtype: typeId
            },
            body: updatedTypeData
        };
    
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await editTypeProposal(req, res);
    
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal updated successfully',
            type: updatedTypeData
        });
    });

    it('should return 404 if the type proposal does not exist', async () => {
        const typeId = '1';
        const updatedTypeData = {
            proposaltype: 'Type B'
        };

        models.proposaltype.findByPk.mockResolvedValue(null);

        const req = {
            params: {
                idtype: typeId
            },
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal not found'
        });
    });

    it('should return 409 if the updated type proposal already exists', async () => {
        const typeId = '1';
        const updatedTypeData = {
            proposaltype: 'Type B'
        };

        const existingType = {
            id: 2,
            proposaltype: 'Existing Type'
        };

        models.proposaltype.findByPk.mockResolvedValue(existingType);
        models.proposaltype.findOne.mockResolvedValue(existingType);

        const req = {
            params: {
                idtype: typeId
            },
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type proposal already exists'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const typeId = '1';
        const updatedTypeData = {
            proposaltype: 'Type B'
        };

        models.proposaltype.findByPk.mockRejectedValue(new Error('Database error'));

        const req = {
            params: {
                idtype: typeId
            },
            body: updatedTypeData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editTypeProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: expect.any(Error)
        });
    });
});