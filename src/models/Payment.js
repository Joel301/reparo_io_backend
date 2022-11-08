const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("payment", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    payment_id: {
      type: DataTypes.STRING,
    },
    merchant_order_id: {
      type: DataTypes.STRING,
    },
    payment_type: {
      type: DataTypes.STRING,
    },
  });
};
