const {DataType} = require("sequelize")

module.export = (sequelize) => {
    sequelize.define(
        "profesionals",
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
                type: DataTypes.INTEGER,
                validate: {
                  min: 0,
                  max: 100,
                }
            }
            
        },

    )
}