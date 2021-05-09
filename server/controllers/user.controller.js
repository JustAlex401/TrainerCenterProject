const Service = require('../services/index');
const {ErrorHandler} = require('../middleware/errors/error');
const err = require('../middleware/errors/errors.const');

const getCalories = async (req, res, next) => {

    try{

      const data = await Service.getCaloriesServ(req.body, req.params.id);

      res.status(200).json(data);

      next();
    } catch (error) {
      console.log(error);
      next(new ErrorHandler(500, err[500]));
    }
}

const getProfile = async (req, res, next) => {

  try{

    const data = await Service.getProfileServ(req.params.id);

    res.status(200).json(data);

    next();

  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500, err[500]));
  }
}

const payment = async (req, res, next) => {

  try {
    const data = await Service.paymentServ(req.body);

    res.status(200).json(data);

    next();
  } catch (err) {
    console.log(error);
    next(new ErrorHandler(500, err[500]));
  }

}

const getExercisesAndTrainer = async (req, res, next) => {
  try{
    const data = await Service.getExercisesAndTrainerServ(req.params.id, req.body);

    res.status(200).json(data);

    next();
  } catch (error) {
    console.log(error);
    next(new ErrorHandler(500, err[500]));
  }
  
}

const getPaymentsForUser = async (req, res, next) => {
  
  try{
    const data = await Service.getPaymentsForUserServ(req.params.id);

    res.status(200).json(data)

    next();
  } catch (error) {

  }
}

module.exports = {
  getCalories,   
  getProfile,
  payment,
  getExercisesAndTrainer,
  getPaymentsForUser
}