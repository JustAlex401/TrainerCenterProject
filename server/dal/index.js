const authDal = require('./auth.dal');
const trainerDal = require('./trainer.dal');
const userDal = require('./user.dal');

const dal = {
    login: authDal.login,
    registration: authDal.registration,
    activate: authDal.activate,
    getListTrainers: trainerDal.getListTrainers,
    getAdditionalOptionForCalories: userDal.getAdditionalOptionForCalories,
    saveToProfile: userDal.saveToProfile
}

module.exports=dal;

