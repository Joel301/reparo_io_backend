const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("cart", {
        id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        },
        status:{
            type: DataTypes.STRING,

        },
        payment_id: {
            type: DataTypes.STRING,
        },
        merchant_order_id:{
            type: DataTypes.STRING,
        },
        payment_type:{
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('pending','approved','authorized','in_proccess','in_mediation','rejected','cancelled','refunded','charged_back'),
            defaultValue: 'pending',
        },    
    });
};

