const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
