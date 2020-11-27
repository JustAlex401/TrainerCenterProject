const {db} = require("../models/db");
const bcrypt = require('bcrypt');
const User = db.user;

const registration = async function registration(regForm){

    const hashedPassword = await bcrypt.hash(regForm.password, 12);

    regForm.password=hashedPassword;
    regForm.active=0;
    regForm.role_id=2;

    await User.create(regForm).catch(err => {
        throw err.message;
    });

    return "User was created";
}

const login = async function login(loginForm){

    const user = await User.findOne(
        {
            where: {
                login: loginForm.login,
            }
        }
    );

    if(!user || (user.active !== 1)){
        throw "User not found";
        // throw Error;
    } 

    const isMatch = await bcrypt.compare(loginForm.password, user.password);

    if(!isMatch){
        throw "Incorrect Data";
    }

}

const activate = async function activate(login){
    await User.update({
        active: 1,
    }, 
    {
        where: {
            login: login,
        }
    }).catch(err => {
        throw err.message;
    });

    return "Success updated data";
}


module.exports = {
    registration,
    login,
    activate,
}