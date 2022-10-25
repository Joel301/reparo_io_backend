const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    uid: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // phoneNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // address: {
    //   type: DataTypes.TEXT,
    //   allowNull: false,
    // },
    email: { // voy a quitar validacion de email porque firebase lo hace por nosotros
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isEmail: true,
      // },
      // unique: {
      //   args: true,
      //   msg: "Email address already in use!",
      // },
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // profileImg: {
    //   type: DataTypes.STRING,
    //   defaultValue:
    //     "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
    // },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // isProfessional: { type: DataTypes.STRING, defaultValue: null },
    // isClient: { type: DataTypes.STRING, defaultValue: null },
    // isAdmin: { type: DataTypes.STRING, defaultValue: null },
  });
};