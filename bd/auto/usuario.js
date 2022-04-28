const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
