const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("client", 
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
      // allowNull: false,
    },
    profileImg: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    timestamps: false,
    createdAt: false,
  }
);
  

};
