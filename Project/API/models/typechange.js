const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('typechange', {
    idtypechange: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typechange: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "typechange_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'typechange',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtypechange" },
        ]
      },
      {
        name: "typechange_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "typechange" },
        ]
      },
    ]
  });
};
