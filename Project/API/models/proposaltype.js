const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proposaltype', {
    idproposaltype: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    proposaltype: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "proposaltype_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'proposaltype',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idproposaltype" },
        ]
      },
      {
        name: "proposaltype_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "proposaltype" },
        ]
      },
    ]
  });
};
