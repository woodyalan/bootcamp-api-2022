const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nota', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      }
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nota',
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
      {
        name: "nota_usuario_id_fk",
        using: "BTREE",
        fields: [
          { name: "usuarioId" },
        ]
      },
    ]
  });
};
