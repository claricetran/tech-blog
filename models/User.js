const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        hooks: {
            beforeCreate: (userObj) => {
                userObj.password = bcrypt.hashSync(userObj.password, 4);
                return userObj;
            },
            beforeUpdate: (userObj) => {
                userObj.password = bcrypt.hashSync(userObj.password, 4);
                return userObj;
            },
        },
    }
);

module.exports = User;
