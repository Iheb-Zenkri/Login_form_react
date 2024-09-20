const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Suggestion = Sequelize.define("Suggestion",{
        reclamId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content: {
            type : DataTypes.STRING,
            allowNull : false,
        },
      
    });
    return Suggestion ;
}