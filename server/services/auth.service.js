const Dal = require('../dal/index');

const registrationServ = async function registrationServ(regForm){
    return await Dal.registration(regForm);
}

const loginServ = async function loginServ(LoginForm){
    return await Dal.login(LoginForm);
}

const activateServ = async function activateServ(login){
    return await Dal.activate(login);
}

module.exports = {
    registrationServ,
    loginServ,
    activateServ,
}