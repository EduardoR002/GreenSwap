const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notification', {
    idnotification: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idtypenotification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'typenotification',
        key: 'idtypenotification'
      }
    },
    idpurchase: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'purchase',
        key: 'idpurchase'
      }
    },
    idproposal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proposal',
        key: 'idproposal'
      }
    },
    idcertificate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'certificate',
        key: 'idcertificate'
      }
    },
    idrequest: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'requestseller',
        key: 'idrequestseller'
      }
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    for_field: {
      type: DataTypes.STRING(45),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'notification',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idnotification" },
        ]
      },
      {
        name: "typenotification_idx",
        using: "BTREE",
        fields: [
          { name: "idtypenotification" },
        ]
      },
      {
        name: "purchase_idx",
        using: "BTREE",
        fields: [
          { name: "idpurchase" },
        ]
      },
      {
        name: "proposal_idx",
        using: "BTREE",
        fields: [
          { name: "idproposal" },
        ]
      },
      {
        name: "certificate_idx",
        using: "BTREE",
        fields: [
          { name: "idcertificate" },
        ]
      },
      {
        name: "request_idx",
        using: "BTREE",
        fields: [
          { name: "idrequest" },
        ]
      },
    ]
  });
};
