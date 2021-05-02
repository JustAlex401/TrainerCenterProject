const {db} = require("../models/db");
const Trainer = db.trainer;
const User = db.user;
const Profile = db.profile;
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const {QueryTypes} = require('sequelize');

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

const saveToProfile = async (profileData, userId, calories) => {
  let data;

  try{
      data = await Profile.update(
        {age: profileData.age, 
          weight: profileData.weight, 
          height: profileData.height, 
          gender: profileData.gender, 
          calories: calories,
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
        
        console.log('saveData', data)
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }

  return data[0];
}

module.exports = {
  getAdditionalOptionForCalories,
  saveToProfile
}