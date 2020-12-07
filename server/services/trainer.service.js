const dal = require('../dal/index');

const getListTrainersService =  async function getListTrainersService(){

    const data = await dal.getListTrainers();

    return data;
}

module.exports = {
    getListTrainersService
}