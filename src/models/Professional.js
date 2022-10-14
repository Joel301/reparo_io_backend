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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profileImg: {
                type: DataTypes.STRING,
                defaultValue:
                    "https://img.icons8.com/fluency-systems-regular/96/000000/guest-male.png",
            },
            reputation: {
                type: DataTypes.FLOAT,
                validate: {
                    min: 0,
                    max: 100,
                },
            },
        },
        { timestamps: false }
    );

};
