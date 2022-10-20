const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
