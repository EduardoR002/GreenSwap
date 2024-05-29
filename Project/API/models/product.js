const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    idproduct: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idtypeproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'typeproduct',
        key: 'idtypeproduct'
      }
    },
    idseller: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'seller',
        key: 'idseller'
      }
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproduct" },
        ]
      },
      {
        name: "idTypeProduct_idx",
        using: "BTREE",
        fields: [
          { name: "idtypeproduct" },
        ]
      },
      {
        name: "idSeller_idx",
        using: "BTREE",
        fields: [
          { name: "idseller" },
        ]
      },
    ]
  });
};
