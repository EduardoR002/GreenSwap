const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models');
const { createNotification, getAllNotifications } = require('../controllers/notification.controller.js');

jest.mock('../models');

// Group of unit tests that test the function createNotification
/*describe('createNotification function', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                date: '2023-05-21',
                idtypenotification: 1,
                idpurchase: 1,
                idproposal: 1,
                idcertificate: 1,
                idrequest: 1,
                description: 'Test description',
                for_field: 'Test field',
                userId: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return 200 and the created notification if successful', async () => {
        models.typenotification.findByPk.mockResolvedValue({ idtypenotification: 1 });
        models.purchase.findByPk.mockResolvedValue({ idpurchase: 1 });
        models.proposal.findByPk.mockResolvedValue({ idproposal: 1 });
        models.certificate.findByPk.mockResolvedValue({ idcertificate: 1 });
        models.requestseller.findByPk.mockResolvedValue({ idrequest: 1 });
        models.user.findByPk.mockResolvedValue({ userId: 1 });
        const mockNotification = {
            idnotification: 1,
            ...req.body
        };
        models.notification.create.mockResolvedValue(mockNotification);

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Notification created successfully',
            notification: mockNotification
        });
    });

    it('should return 422 if date, type notification ID, description, for field, or user ID are missing', async () => {
        req.body.date = null;

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Date, Type Notification ID, Description, For Field, and User ID are required'
        });
    });

    it('should return 404 if referenced type notification does not exist', async () => {
        models.typenotification.findByPk.mockResolvedValue(null);

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Type Notification not found'
        });
    });

    
    it('should return 500 if an error occurs during database operation', async () => {
        models.typenotification.findByPk.mockRejectedValue(new Error('Database error'));

        await createNotification(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Something went wrong',
            error: 'Database error'
        });
    });
});*/

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