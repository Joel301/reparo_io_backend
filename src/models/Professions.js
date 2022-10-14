const {DataType} = require("sequelize")


module.export = (sequelize) => {
    sequelize.define(
        "professions",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
              },
        },
            {
              timestamps: false,
              createdAt: false,
            }

    )
}