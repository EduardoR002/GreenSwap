const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requestseller', {
    idrequestseller: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nif: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: "nif_UNIQUE"
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    idstate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'requeststate',
        key: 'idrequestState'
      }
    },
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'idUser'
      }
    }
  }, {
    sequelize,
    tableName: 'requestseller',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idrequestseller" },
        ]
      },
      {
        name: "nif_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "idUser_idx",
        using: "BTREE",
        fields: [
          { name: "iduser" },
        ]
      },
      {
        name: "idState_idx",
        using: "BTREE",
        fields: [
          { name: "idstate" },
        ]
      },
    ]
  });
};
