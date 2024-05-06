const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('typeproduct', {
    idtypeproduct: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typeproduct: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "typeproduct_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'typeproduct',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtypeproduct" },
        ]
      },
      {
        name: "typeproduct_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "typeproduct" },
        ]
      },
    ]
  });
};
