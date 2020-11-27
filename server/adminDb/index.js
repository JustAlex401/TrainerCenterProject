const admin = require('./admin.create');
const roleCr = require('./role.create');

const defWork = async function defWork(db){

    await roleCr(db);
    await admin(db);

}

module.exports=defWork;