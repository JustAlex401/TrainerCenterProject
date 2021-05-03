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

module.exports = {
  getCalories,   
}