const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller', {
    idseller: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idrequest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'requestseller',
        key: 'idrequestseller'
      }
    },
    idcertificate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'certificate',
        key: 'idcertificate'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'seller',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idseller" },
        ]
      },
      {
        name: "idRequest_idx",
        using: "BTREE",
        fields: [
          { name: "idrequest" },
        ]
      },
      {
        name: "idCertificate_idx",
        using: "BTREE",
        fields: [
          { name: "idcertificate" },
        ]
      },
    ]
  });
};
