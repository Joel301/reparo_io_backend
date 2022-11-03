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
          },
    },  
    {
        timestamps: true,
        createdAt: false,
      });
};

