const { ErrorHandler } = require("../middleware/errors/error");
const {db} = require("../models/db");
const User = db.user;
const Role = db.role;
const Profile = db.profile;
const err = require('../middleware/errors/errors.const');

const registration = async function registration(regForm){

  const t = await db.sequelize.transaction();
  let user; 

  try{
    user = await User.create(regForm, { transaction: t });

    console.log('userAAA', user)
    await Profile.create({
      userId: user.id
    }, { transaction: t });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new ErrorHandler(500, err[500]);
  }

  return user;
}

const login = async function login(loginForm){

    let user;

    try{
        user = await User.findOne(
            {
                where: {
                    login: loginForm.login,
                }
            }
        );

        const role = await Role.findOne({
            where: {
                id: user.roleId,
            }
        });
        
        user["dataValues"].role=role.role;

    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return user["dataValues"];

}

const activate = async function activate(login){

    let user;

    try{

        user = await User.update({
            active: 1,
        }, 
        {
            where: {
                login: login,
            }
        })
    } catch(error) {
        throw new ErrorHandler(500, err[500]);
    }

    return user;
}

module.exports = {
    registration,
    login,
    activate,
}