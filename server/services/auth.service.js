const authDal = require('../dal/auth.dal');

const registrationServ = async function registrationServ(regForm){
    return await authDal.reg(regForm);
}


module.exports = {
    registrationServ,
}