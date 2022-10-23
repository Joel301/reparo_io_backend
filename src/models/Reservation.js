const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reservation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      startDay: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDay: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
