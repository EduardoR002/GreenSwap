const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchasestate', {
    idpurchasestate: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "state_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'purchasestate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idpurchasestate" },
        ]
      },
      {
        name: "state_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
