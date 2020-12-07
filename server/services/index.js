const authServ = require('./auth.service');
const trainerServ = require('./trainer.service');


const Service = {
    registrationServ: authServ.registrationServ,
    loginServ: authServ.loginServ,
    activateServ: authServ.activateServ,
    getListTrainersService: trainerServ.getListTrainersService,
    logoutServ: authServ.logoutServ,
}

module.exports=Service;

// const registrationServ = async function registrationServ(regForm){
//     return await authServ.registrationServ(regForm)
// }

// const loginServ = async function loginServ(regForm){
//     return await authServ.loginServ(regForm)
// }

// const activateServ = async function activateServ(login){
//     return await authServ.activateServ(login)
// }

// module.exports = {
//     registrationServ, 
//     loginServ,
//     activateServ
// }