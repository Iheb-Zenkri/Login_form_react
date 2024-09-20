const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Comment = Sequelize.define("Comment",{
        reclamId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content: {
            type : DataTypes.STRING,
            allowNull : false,
        },
      
    });
    return Comment ;
}