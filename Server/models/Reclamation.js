const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Reclamation = Sequelize.define("Reclamation",{
        clientId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        companyId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        reclamDate: {
            type : DataTypes.DATE,
            allowNull : false,
        },
        state: {
            type : DataTypes.STRING,
            allowNull : false,
        },
        title: {
            type : DataTypes.STRING,
            allowNull : false ,
        },
        content: {
            type : DataTypes.STRING,
            allowNull : false ,
        }
    });
    return Reclamation ;
}