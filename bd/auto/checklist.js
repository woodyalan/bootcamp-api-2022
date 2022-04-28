const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checklist', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    notaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nota',
        key: 'id'
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'checklist',
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
        name: "checklist_nota_id_fk",
        using: "BTREE",
        fields: [
          { name: "notaId" },
        ]
      },
    ]
  });
};
