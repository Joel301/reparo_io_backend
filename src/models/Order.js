const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
