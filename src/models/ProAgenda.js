const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("proAgenda", {
    timestamps: false,
    createdAt: false,
  });
};
