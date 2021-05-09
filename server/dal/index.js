const authDal = require('./auth.dal');
const trainerDal = require('./trainer.dal');
const userDal = require('./user.dal');

const dal = {
    login: authDal.login,
    registration: authDal.registration,
    activate: authDal.activate,
    getListTrainers: trainerDal.getListTrainers,
    getAdditionalOptionForCalories: userDal.getAdditionalOptionForCalories,
    saveToProfile: userDal.saveToProfile,
    getProfile: userDal.getProfile,
    getExercisesAndTrainerDal: userDal.getExercisesAndTrainerDal,
    getTrainerByTypeOfFitness: trainerDal.getTrainerByTypeOfFitness,
    updateProfileForTrainer: userDal.updateProfileForTrainer,
    createPayment: userDal.createPayment,
    getPaymentsForUser: userDal.getPaymentsForUser,
    exercisesPerUser: userDal.exercisesPerUser,
    getExercisePerUser: userDal.getExercisePerUser,
    getTrainerDataForEmail: userDal.getTrainerDataForEmail,
    pushWeight: userDal.pushWeight,
    getWeights: userDal.getWeights
}

module.exports=dal;

