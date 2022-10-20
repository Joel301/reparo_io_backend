const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order_details", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    days: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
