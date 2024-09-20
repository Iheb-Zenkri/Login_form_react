const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Clients = Sequelize.define("Clients",{
        username: {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true ,
        },
        email: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        mdp: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        firstName: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        lastName: {
            type : DataTypes.STRING,
            allowNull : true,
        },
        birthday: {
            type : DataTypes.DATE,
            allowNull : true,
        },
        phoneNumber: {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
    });
    return Clients ;
}