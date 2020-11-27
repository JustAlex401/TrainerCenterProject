const controller = require('./auth.controller');


const registration = async function registration(req, res, next){
    return await controller.registration(req, res, next);
}

const login = async function login(req, res, next){
    return await controller.login(req, res, next);
}

const activate = async function activate(req, res, next){
    return await controller.activate(req, res, next);
}

module.exports = {
    registration,
    login,
    activate
}