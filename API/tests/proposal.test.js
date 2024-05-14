const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const {
    createProposal,
    getAllProposals,
    editProposal
} = require('../controllers/proposal.controller.js');

jest.mock('../models');

describe('createProposal function', () => {
    it('should return 200 and the created proposal if successful', async () => {
        const mockProposal = {
            id: 1,
            newprice: 200,
            iduser: 1,
            idproduct: 1,
            idproposalstate: 1,
            idproposaltype: 1
        };

        models.user.findByPk.mockResolvedValue({});
        models.product.findByPk.mockResolvedValue({});
        models.proposalstate.findByPk.mockResolvedValue({});
        models.proposaltype.findByPk.mockResolvedValue({});
        models.proposal.create.mockResolvedValue(mockProposal);

        const req = {
            body: {
                newprice: 200,
                iduser: 1,
                idproduct: 1,
                idproposalstate: 1,
                idproposaltype: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Proposal created successfully',
            proposal: mockProposal
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 422 if price is not greater than zero', async () => {
        const req = {
            body: {
                newprice: 0,
                iduser: 1,
                idproduct: 1,
                idproposalstate: 1,
                idproposaltype: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Price must be greater than zero'
        });
    });

    it('should return 404 if user, product, proposal state, or proposal type not found', async () => {
        const req = {
            body: {
                newprice: 200,
                iduser: 1,
                idproduct: 1,
                idproposalstate: 1,
                idproposaltype: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.user.findByPk.mockResolvedValue(null);
        models.product.findByPk.mockResolvedValue(null);
        models.proposalstate.findByPk.mockResolvedValue(null);
        models.proposaltype.findByPk.mockResolvedValue(null);

        await createProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User, Product, Proposal State, or Proposal Type not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                newprice: 200,
                iduser: 1,
                idproduct: 1,
                idproposalstate: 1,
                idproposaltype: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.user.findByPk.mockRejectedValue(new Error('Database error'));

        await createProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('getAllProposals function', () => {
    it('should return 200 and an array of proposals if found', async () => {
        const proposals = [{
            id: 1,
            newprice: 200,
            iduser: 1,
            idproduct: 1,
            idproposalstate: 1,
            idproposaltype: 1
        }];

        models.proposal.findAll.mockResolvedValue(proposals);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllProposals(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Proposals found successfully',
            proposals: proposals
        });
    });

    it('should return 404 if no proposals are found', async () => {
        models.proposal.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllProposals(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No proposals found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposal.findAll.mockRejectedValue(new Error('Database error'));

        await getAllProposals(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

describe('editProposal function', () => {
    it('should return 200 and the updated proposal data if successful', async () => {
        const proposalId = '1';
        const updatedProposalData = {
            newprice: 250,
            iduser: 2,
            idproduct: 2,
            idproposalstate: 2,
            idproposaltype: 2,
            quantity: 20,
            futuredate: '2024-05-16',
            startday: '2024-05-16'
        };

        const proposal = {
            save: jest.fn().mockResolvedValue(updatedProposalData)
        };

        models.proposal.findByPk.mockResolvedValue(proposal);

        const req = {
            params: {
                proposalId: proposalId
            },
            body: updatedProposalData
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Proposal updated successfully',
            proposal: updatedProposalData
        });
    });

    it('should return 422 if any required field is missing', async () => {
        const req = {
            params: {
                proposalId: '1'
            },
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await editProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'All fields are required'
        });
    });

    it('should return 404 if the proposal does not exist', async () => {
        const req = {
            params: {
                proposalId: '1'
            },
            body: {
                newprice: 250,
                iduser: 2,
                idproduct: 2,
                idproposalstate: 2,
                idproposaltype: 2,
                quantity: 20,
                futuredate: '2024-05-16',
                startday: '2024-05-16'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposal.findByPk.mockResolvedValue(null);

        await editProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Proposal not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            params: {
                proposalId: '1'
            },
            body: {
                newprice: 250,
                iduser: 2,
                idproduct: 2,
                idproposalstate: 2,
                idproposaltype: 2,
                quantity: 20,
                futuredate: '2024-05-16',
                startday: '2024-05-16'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.proposal.findByPk.mockRejectedValue(new Error('Database error'));

        await editProposal(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});