const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "review", 
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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