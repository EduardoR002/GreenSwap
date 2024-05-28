const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchasetype', {
    idpurchasetype: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "type_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'purchasetype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpurchasetype" },
        ]
      },
      {
        name: "type_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
    ]
  });
};
