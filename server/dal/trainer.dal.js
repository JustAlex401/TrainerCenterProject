const {db} = require("../models/db");
const Trainer = db.trainer;
const User = db.user;
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const {QueryTypes} = require('sequelize');

const getListTrainers = async function getListTrainers () {

    let data;

    try{
        data = await db.sequelize.query(
            `
                select u.id, u.login, u.email, t.age, typ.typeOfFitness, t.weight, t.height, t.name, t.character, t.photo from users u
                  join trainers t on u.trainerId = t.id
                  join typesOfFitnesses typ on typ.id = t.typesOfFitnessId;
            `
            , {type: QueryTypes.SELECT});
            console.log("AAa")
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return data;
}

const getTrainerByTypeOfFitness = async function getListTrainers (typeOfFitness) {

  let data;

  try{
    data = await db.sequelize.query(
      `
        select * from trainers tr join users u on tr.id = u.trainerId
          join typesOfFitnesses typ on tr.typesOfFitnessId = typ.id 
          where typesOfFitnessId = ${typeOfFitness};
      `
      , {type: QueryTypes.SELECT});
  } catch (error) {
      throw new ErrorHandler(500, err[500]);
  }

  return data;
}

module.exports = {
    getListTrainers,
    getTrainerByTypeOfFitness
}