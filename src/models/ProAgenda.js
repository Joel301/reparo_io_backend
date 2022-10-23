const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "proAgenda",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
