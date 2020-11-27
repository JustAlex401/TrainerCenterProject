const authDal = require('./auth.dal');

const registration = async function registration (regForm){
    return await authDal.registration(regForm);
}

const login = async function login (loginForm){
    return await authDal.login(loginForm);
}

const activate = async function activate (login){
    return await authDal.activate(login);
}

module.exports = {
    registration,
    login,
    activate
}
