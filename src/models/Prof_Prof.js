const { DataType } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Prof_Prof",
    {},
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
