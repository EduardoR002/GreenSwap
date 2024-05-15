const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const { createNotification, getAllNotifications } = require('../controllers/notification.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createNotification
describe('createNotification function', () => {
    it('should return 200 and the created notification if successful', async () => {
        const mockNotification = {
            id: 1,
            date: '2024-05-14',
            idtypenotification: 1,
            idpurchase: 1,
            idproposal: 1,
            idcertificate: 1,
            idrequest: 1
        };

        models.typenotification.findByPk.mockResolvedValue({});
        models.purchase.findByPk.mockResolvedValue({});
        models.proposal.findByPk.mockResolvedValue({});
        models.certificate.findByPk.mockResolvedValue({});
        models.requestseller.findByPk.mockResolvedValue({});
        models.notification.create.mockResolvedValue(mockNotification);

        const req = {
            body: {
                date: '2024-05-14',
                idtypenotification: 1,
                idpurchase: 1,
                idproposal: 1,
                idcertificate: 1,
                idrequest: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Notification created successfully',
            notification: mockNotification
        });
    });

    it('should return 422 if date or type notification ID are missing', async () => {
        const req = {
            body: {
                date: '2024-05-14',
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Date and Type Notification ID are required'
        });
    });

    it('should return 404 if referenced type notification does not exist', async () => {
        models.typenotification.findByPk.mockResolvedValue(null);

        const req = {
            body: {
                date: '2024-05-14',
                idtypenotification: 1,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type Notification not found'
        });
    });

    it('should return 404 if referenced IDs do not exist', async () => {
        const req = {
            body: {
                date: '2024-05-14',
                idtypenotification: 1,
                idpurchase: 1,
                idproposal: 1,
                idcertificate: 1,
                idrequest: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findByPk.mockResolvedValue(null);
        models.purchase.findByPk.mockResolvedValue(null);
        models.proposal.findByPk.mockResolvedValue(null);
        models.certificate.findByPk.mockResolvedValue(null);
        models.requestseller.findByPk.mockResolvedValue(null);

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type Notification not found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {
            body: {
                date: '2024-05-14',
                idtypenotification: 1,
                idpurchase: 1,
                idproposal: 1,
                idcertificate: 1,
                idrequest: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.typenotification.findByPk.mockResolvedValue({});
        models.purchase.findByPk.mockRejectedValue(new Error('Database error'));

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});

// Group of unit tests that test the function getAllNotifications
describe('getAllNotifications function', () => {
    it('should return 200 and an array of notifications if found', async () => {
        const notifications = [{
            id: 1,
            date: '2024-05-14',
            idtypenotification: 1,
            idpurchase: 1,
            idproposal: 1,
            idcertificate: 1,
            idrequest: 1
        }];

        models.notification.findAll.mockResolvedValue(notifications);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllNotifications(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Notifications found successfully',
            notifications: notifications
        });
    });

    it('should return 404 if no notifications are found', async () => {
        models.notification.findAll.mockResolvedValue([]);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAllNotifications(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No notifications found'
        });
    });

    it('should return 500 if an error occurs during database operation', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        models.notification.findAll.mockRejectedValue(new Error('Database error'));

        await getAllNotifications(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});