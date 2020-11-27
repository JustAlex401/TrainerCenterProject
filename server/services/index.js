const authServ = require('./auth.service');

const registrationServ = async function registrationServ(regForm){
    return await authServ.registrationServ(regForm)
}

const loginServ = async function loginServ(regForm){
    return await authServ.loginServ(regForm)
}

const activateServ = async function activateServ(login){
    return await authServ.activateServ(login)
}

module.exports = {
    registrationServ, 
    loginServ,
    activateServ
}