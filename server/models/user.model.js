const { DataTypes } = require("sequelize");

const userCr = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },

        login: {  
            type: Sequelize.STRING,
            unique: true,
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
                    msg:"Email required"
                },
                isEmail:{
                    args:true,
                    msg:'Valid email required'
                }
            }
          },

        active: {
              type: DataTypes.BOOLEAN,
              defaultValue: 0,
          },

        role_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'roles',
              key: 'id',
            }
        },

      //   trainer_id: {
      //     type: Sequelize.INTEGER,
      //     defaultValue: null,
      //     references: {
      //       model: 'trainers',
      //       key: 'id',
      //     }
      // },
        
        },

          {
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ]
    })

    return User;
}

module.exports ={
    userCr 
  }