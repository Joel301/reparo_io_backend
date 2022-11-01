const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cartDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      reservationAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: false,
    }
  );
};
