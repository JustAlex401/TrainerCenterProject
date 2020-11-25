const { DataTypes } = require("sequelize");

const models = (sequelize, Sequelize) => {


    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },

          login: {  
            type: Sequelize.STRING,
            allowNull: false,
          },

          password: {  
            type: Sequelize.STRING,
            allowNull: false,
          },

          email: {  
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true, 
                msg: 'Email already exists', 
                fields: ['email']
            },
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Email-id required"
                },
                isEmail:{
                    args:true,
                    msg:'Valid email-id required'
                }
            }
          },

          active: {
              type: DataTypes.BOOLEAN,
          }},

          {
          indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ]

    })

    const db = {
        user: User
    }

    return db;
}

module.exports ={
    models 
  }