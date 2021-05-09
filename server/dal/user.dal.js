const {db} = require("../models/db");
const Trainer = db.trainer;
const User = db.user;
const Profile = db.profile;
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const {QueryTypes} = require('sequelize');
const { response } = require("express");

const getAdditionalOptionForCalories = async (id) => {

  let data;

  try{
      data = await db.sequelize.query(
        `
          select result from KnowledgeBazeForCalories where id = ${id};
        `,
        {type: QueryTypes.SELECT}
        );
  } catch (error) {
      throw new ErrorHandler(500, err[500]);
  }

  return data[0];
}

const saveToProfile = async (profileData, userId) => {

  try{
      await Profile.update(
        {age: profileData.age, 
          weight: profileData.weight, 
          height: profileData.height, 
          gender: profileData.gender, 
          calories: profileData.calories,
          knowledgeBazeForCaloryId: profileData.knowledgeBazeForCaloryId
        },
        {
          where: {
            userId: Number.parseInt(userId)
          },
          returning: true, // needed for affectedRows to be populated
          plain: true // makes sure that the returned instances are just plain objects},
        },
        {type: QueryTypes.UPDATE}
        );
        
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
}

const getProfile = async (id) => {

  let data1;
  let exercises;
  let trainer;
  let data;

  try{
      data1 = await db.sequelize.query(
        `
          select * from profiles where userId = ${id};
        `,
        {type: QueryTypes.SELECT}
        );

        exercises = await db.sequelize.query(
        `
          select * from exercisesPerUsers where userId = ${id};
        `,
        {type: QueryTypes.SELECT}
        );

        trainer = await db.sequelize.query(
          `
            select * from trainers t join profiles p on t.id = p.trainerId where userId = ${id};
          `,
          {type: QueryTypes.SELECT}
          );
      data={...data1[0], exercises, trainer}
  } catch (error) {
      throw new ErrorHandler(500, err[500]);
  }

  return data;
}

const getExercisesAndTrainerDal = async (met, typeOfFitness) => {

  let result;
  let data;

  try{
      data = await db.sequelize.query(
        `
          select * from caloriesAndExercises where met > ${met - 0.5} and met < ${met + 0.5} and typesOfFitnessId = ${typeOfFitness};
        `,
        {type: QueryTypes.SELECT}
      );
      if (!data.length) {
        data = await db.sequelize.query(
          `
            select * from caloriesAndExercises where typesOfFitnessId = ${typeOfFitness} order by met desc LIMIT 3;
          `,
          {type: QueryTypes.SELECT}
        );
        result = {exercises: [...data], limit: true};
      } else {
        result = {exercises: [...data], limit: false};
      }
  } catch (error) {
      throw new ErrorHandler(500, err[500]);
  }
  return result;
}

const updateProfileForTrainer = async (updateData) => {
  let data;

console.log('updateData', updateData)

  try{
      data = await db.sequelize.query(
        `
          update profiles set 
                trainerId = ${updateData.trainer.trainerId}, 
                caloriesPerDay = ${updateData.caloriesPerDay}, 
                timeForTraining = ${updateData.timeForTraining}
            where userId = ${updateData.userId};
        `,
        {type: QueryTypes.UPDATE}
        );
  } catch (error) {
    console.log(error)
      throw new ErrorHandler(500, err[500]);
  }

}

const createPayment = async (paymentData) => {
  let data;

  console.log('paymentDataaaa', paymentData);
  try{
      data = await db.sequelize.query(
        `
          insert into purchaseOfSubscriptions (price, numberWorkouts, purchaseDate, userId)
              values(${paymentData.amount}, '${paymentData.number}', NOW(), ${paymentData.userId})
        `,
        {type: QueryTypes.INSERT}
        );
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  
}

const getPaymentsForUser = async (id) => {
  let data;

  try{
      data = await db.sequelize.query(
        `
          select * from purchaseOfSubscriptions where userId = ${id}
        `,
        {type: QueryTypes.SELECT}
        );
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  
  return data;
}

const exercisesPerUser = async (id, exercises) => {
  let data;

  console.log("VVVVVVVVVVVVVV", exercises)
  const t = await db.sequelize.transaction();

  try{
    await db.sequelize.query(
      `
        delete from exercisesPerUsers where userId = ${id};
      `,
      {type: QueryTypes.DELETE}, { transaction: t })

    const saveData = exercises.map((item) => {
      return {name: item.exercise, userId: id}
    })
    console.log("CCCCCCCCCCCCCDDDDDDDD", saveData)
    data = await db.exercisesPerUser.bulkCreate(saveData,
        {type: QueryTypes.INSERT}, { transaction: t }
        );
    await t.commit();

  } catch (error) {
    console.log(error)
    await t.rollback();
    throw new ErrorHandler(500, err[500]);
  }
  
}

const getExercisePerUser = async (id) => {
  let data;

  try{
      data = await db.sequelize.query(
        `
          select * from exercisesPerUsers where userId = ${id}
        `,
        {type: QueryTypes.SELECT}
        );
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  
  return data;
}

const getTrainerDataForEmail = async (id) => {
  let data;
  let user;
  let result;

  try{

    user = await db.sequelize.query(
      `
        select login, email from users where id = ${id};
      `,
      {type: QueryTypes.SELECT}
      );

      data = await db.sequelize.query(
        `
          select * from trainers t join profiles p on t.id = p.trainerId
              join users u on u.trainerId = t.id where p.userId = ${id};
        `,
        {type: QueryTypes.SELECT}
        );

        console.log("AFAFAFAF", user)
      result = {trainer: {...data[0]}, user: {...user[0]}}
      console.log("CBCBCBCBCBCBCBCB", result)
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  
  return result;
}

const pushWeight = async (id, weight) => {

  try{
    await db.sequelize.query(
      `
        insert into userWeights (weight, date, userId) values (${weight}, NOW(), ${id});
      `,
      {type: QueryTypes.INSERT}
      );
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }

}

const getWeights = async (id) => {
  let result
  try{
    result = await db.sequelize.query(
      `
        select * from userWeights where userId = ${id} order by date desc;
      `,
      {type: QueryTypes.SELECT}
      );
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  return result;
}

module.exports = {
  getAdditionalOptionForCalories,
  saveToProfile,
  getProfile,
  getExercisesAndTrainerDal,
  updateProfileForTrainer,
  createPayment,
  getPaymentsForUser,
  exercisesPerUser,
  getExercisePerUser,
  getTrainerDataForEmail,
  pushWeight,
  getWeights
}