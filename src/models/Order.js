const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
    },
  });
};
