const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    uid: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};