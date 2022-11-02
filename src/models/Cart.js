const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("cart", {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        },
        amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        },
        paymentId: {
            type: DataTypes.INTEGER
        },
    });
};

