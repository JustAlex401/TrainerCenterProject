const authController = require('./auth.controller');
const trainerController = require('./trainer.controller');
const userController = require('./user.controller');

const controller = {
    registration : authController.registration,
    login : authController.login,
    activate : authController.activate,
    getListTrainers: trainerController.getListTrainers,
    logout: authController.logout,
    getCalories: userController.getCalories,
    getProfile: userController.getProfile,
    payment: userController.payment,
    getExercisesAndTrainer: userController.getExercisesAndTrainer,
    getPaymentsForUser: userController.getPaymentsForUser
}


module.exports=controller;
