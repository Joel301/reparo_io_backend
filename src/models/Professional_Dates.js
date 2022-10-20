const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "professional_dates",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      days: {
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
