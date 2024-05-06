const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stockchanges', {
    idstockchanges: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idtypechange: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'typechange',
        key: 'idtypechange'
      }
    },
    idproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idproduct'
      }
    }
  }, {
    sequelize,
    tableName: 'stockchanges',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idstockchanges" },
        ]
      },
      {
        name: "idtypechange_idx",
        using: "BTREE",
        fields: [
          { name: "idtypechange" },
        ]
      },
      {
        name: "productchanges_idx",
        using: "BTREE",
        fields: [
          { name: "idproduct" },
        ]
      },
    ]
  });
};
