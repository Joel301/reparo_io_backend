const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reservation",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      days: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
