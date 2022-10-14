const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "profession",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
