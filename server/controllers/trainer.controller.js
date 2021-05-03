const Service = require('../services/index');
const {ErrorHandler} = require('../middleware/errors/error');
const err = require('../middleware/errors/errors.const');

const getListTrainers = async function getListTrainers(req, res, next) {
    try{

        const data = await Service.getListTrainersService();

        res.status(200).json(data);

        next();
    } catch (error) {
        console.log(error);
        next(new ErrorHandler(400, err[400]));
    }
}

module.exports = {
    getListTrainers,   
}