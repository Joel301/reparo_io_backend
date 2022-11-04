const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("cart", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0
    },
  },
    {
      timestamps: true,
      createdAt: false,
    });
};

