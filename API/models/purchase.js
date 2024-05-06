const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchase', {
    idpurchase: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    buydate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    previewdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    definitivedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    futurepurchase: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'idproduct'
      }
    },
    idtypepurchase: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'purchasetype',
        key: 'idpurchasetype'
      }
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    },
    startday: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idpurchasestate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'purchasestate',
        key: 'idpurchasestate'
      }
    }
  }, {
    sequelize,
    tableName: 'purchase',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpurchase" },
        ]
      },
      {
        name: "typepurchase_idx",
        using: "BTREE",
        fields: [
          { name: "idtypepurchase" },
        ]
      },
      {
        name: "user_idx",
        using: "BTREE",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "product_idx",
        using: "BTREE",
        fields: [
          { name: "idproduct" },
        ]
      },
      {
        name: "idpurchasestate_idx",
        using: "BTREE",
        fields: [
          { name: "idpurchasestate" },
        ]
      },
    ]
  });
};
