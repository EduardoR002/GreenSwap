const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requeststate', {
    idrequestState: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "estadoPedidocol_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'requeststate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idrequestState" },
        ]
      },
      {
        name: "estadoPedidocol_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "state" },
        ]
      },
    ]
  });
};
