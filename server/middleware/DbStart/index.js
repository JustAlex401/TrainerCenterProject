const adminCr = require('./admin.create');
const roleCr = require('./role.create');
const trainerCr = require('./trainer.create');

const defWork = async function defWork(db){

    await roleCr(db);
    await adminCr(db);
    await trainerCr(db);
}

module.exports=defWork;