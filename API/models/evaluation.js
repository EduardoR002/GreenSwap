const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('evaluation', {
        idevaluation: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'userId'
            }
        },
        idproduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product',
                key: 'idproduct'
            }
        },
        evaluation: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'favorites',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                { name: "idfavorites" },
                ]
            },
            {
                name: "favoriteuser_idx",
                using: "BTREE",
                fields: [
                { name: "userId" },
                ]
            },
            {
                name: "favoriteproduct_idx",
                using: "BTREE",
                fields: [
                { name: "idproduct" },
                ]
            },
        ]
    })
}