const { Router } = require('express');
const { addFavorite, removeFavorite } = require('../controllers/favorites.controller.js');

const router = Router();

router.post('/addfavorite', addFavorite);
router.post('/removefavorite', removeFavorite);

module.exports = router;