const authController = require('./auth.controller');
const trainerController = require('./trainer.controller');


const controller = {
    registration : authController.registration,
    login : authController.login,
    activate : authController.activate,
    getListTrainers: trainerController.getListTrainers,
    logout: authController.logout,
}


module.exports=controller;
