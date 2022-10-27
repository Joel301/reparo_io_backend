const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderDetail", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reservationAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    startDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};