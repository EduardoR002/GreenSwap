const request = require('supertest');
const express = require('express');
const app = express();
const models = require('../models'); // replace with your models path
const { getUser } = require('../controllers/user.controller.js')


app.get('/getuser/:userId', async (req, res) => {
    try {
        await getUser(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
});

jest.mock('../models'); // substitua pelo caminho dos seus modelos

describe('getUser function', () => {
    it('should return 200 and the user object if the user is found', async () => {
        const mockUser = { idUser: '1', name: 'John Doe' };
        models.user.findOne.mockResolvedValue(mockUser);

        const response = await request(app).get('/getuser/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            message: "User found successfully",
            user: mockUser
        });
    });

    it('should return 404 if the user is not found', async () => {
        models.user.findOne.mockResolvedValue(null);

        const response = await request(app).get('/getuser/1');

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
            message: "User not found"
        });
    });
});