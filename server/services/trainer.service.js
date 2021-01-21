const dal = require('../dal/index');
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");

const getListTrainersService =  async function getListTrainersService(){

    let data; 

    try{
        data = await dal.getListTrainers();
        console.log(data);
        debugger;
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    } 

    return data;
}

module.exports = {
    getListTrainersService
}