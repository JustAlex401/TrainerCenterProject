const adminCr = require('./admin.create');
const roleCr = require('./role.create');
const trainerCr = require('./trainer.create');
const knowledgeBazeForCaloriesCr = require('./knowledgeBazeForCaloriesCr.create');

const defWork = async function defWork(db){

    await roleCr(db);
    await adminCr(db);
    await trainerCr(db);
    await knowledgeBazeForCaloriesCr(db);

}

module.exports=defWork;