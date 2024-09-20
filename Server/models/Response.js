const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    const Response = Sequelize.define("Response",{
        reclamId: {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        content: {
            type : DataTypes.STRING,
            allowNull : false,
        },
      
    });
    return Response ;
}