const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      default: DataTypes.NOW
    },
    saleTime:{
        type: DataTypes.TIME,
        allowNull: false,
        default: DataTypes.NOW
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};
