const {db} = require("../models/db");
// const bcrypt = require('bcrypt');
const User = db.user;
const Role = db.role;

const registration = async function registration(regForm){

    const user = await User.create(regForm);

    return user;
}

const login = async function login(loginForm){

    const user = await User.findOne(
        {
            where: {
                login: loginForm.login,
            }
        }
    );

    const role = await Role.findOne({
        where: {
            id: user.role_id,
        }
    });
    
    user["dataValues"].role=role.role;

    return user["dataValues"];

}

const activate = async function activate(login){
    const user = await User.update({
        active: 1,
    }, 
    {
        where: {
            login: login,
        }
    })

    return user;
}

module.exports = {
    registration,
    login,
    activate,
}