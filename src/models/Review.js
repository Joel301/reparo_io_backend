const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "review", 
        {
            clientId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            professionalId:{
                type: DataTypes.UUID,
                primaryKey: true,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating:{
                type: DataTypes.INTEGER,
                validate:{
                    min: 0,
                    max: 5
                },
                defaultValue: 0
            },
        },
        {
            timestamps: false
        }
    );
};
//Id combinado