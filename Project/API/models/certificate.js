const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('certificate', {
    idcertificate: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    certificate: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "certificate_UNIQUE"
    },
    idcertifier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'certifier',
        key: 'idcertifier'
      }
    }
  }, {
    sequelize,
    tableName: 'certificate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcertificate" },
        ]
      },
      {
        name: "certificate_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "certificate" },
        ]
      },
      {
        name: "certifier_idx",
        using: "BTREE",
        fields: [
          { name: "idcertifier" },
        ]
      },
    ]
  });
};
