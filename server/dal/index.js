const authDal = require('./auth.dal');
const trainerDal = require('./trainer.dal');

const dal = {
    login: authDal.login,
    registration: authDal.registration,
    activate: authDal.activate,
    getListTrainers: trainerDal.getListTrainers,
}

module.exports=dal;

