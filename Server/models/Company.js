const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Company = Sequelize.define("Company",{
        name: {
            type : DataTypes.STRING,
            allowNull : false,
        },
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
        Adresse: {
            type : DataTypes.STRING,
            allowNull : true,
        },
        phoneNumber: {
            type : DataTypes.INTEGER,
            allowNull : true,
        },
        logo : {
            type : DataTypes.STRING,
            allowNull : true,
        },
        details : {
            type : DataTypes.STRING,
            allowNull : true,
        }
    });
    return Company ;
}