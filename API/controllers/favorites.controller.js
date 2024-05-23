const models = require('../models');

async function addFavorite(req, res) {
    const { userId, idproduct } = req.body;
    try {
        const existUser = await models.user.findByPk(userId);
        if (!existUser) {
            return res.status(404).json({
                message: "User not founded",
            })
        }
        const existProduct = await models.product.findByPk(idproduct);
        if (!existProduct) {
            return res.status(404).json({
                message: "Product not founded",
            })
        }
        const newFavorite = {
            userId,
            idproduct
        }
        const createdFavorite = await models.favorites.create(newFavorite);
        res.status(200).json({
            message: "Favorite created successfully",
            favorite: createdFavorite
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

async function removeFavorite(req, res){
    const idfavorites = req.body;
    try {
        const favoriteRecord = models.favorites.findByPk(idfavorites);
        if (favoriteRecord) {
            await favoriteRecord.destroy();
            return res.status(200).json({
                message: "Favorite successfully removed"
            });
        }
        else{
            return res.status(404).json({
                message: "Favorite not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
}

module.exports = {
    addFavorite: addFavorite,
    removeFavorite: removeFavorite
}