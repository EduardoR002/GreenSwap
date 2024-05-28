const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposal', {
    idproposal: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    newprice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
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
    idproposalstate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proposalstate',
        key: 'idproposalstate'
      }
    },
    idproposaltype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proposaltype',
        key: 'idproposaltype'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    futuredate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    startday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proposal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproposal" },
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
        name: "proposalstate_idx",
        using: "BTREE",
        fields: [
          { name: "idproposalstate" },
        ]
      },
      {
        name: "proposaltype_idx",
        using: "BTREE",
        fields: [
          { name: "idproposaltype" },
        ]
      },
    ]
  });
};
