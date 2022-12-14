const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "professional",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      aboutMe: {
        type: DataTypes.TEXT,
        defaultValue: "There's no description available",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dayPrice: {
        type: DataTypes.FLOAT,
        defaultValue: 22.0,
      },
      availableDays: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ["lunes", "martes"],
      },
      profileImg: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
      },
      rating: {
        type: DataTypes.FLOAT,
        default: 0.0,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
