const dal = require('../dal/index');
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const config = require('config');
const stripe = require('stripe')(config.get('stripe_secret_key'));

const getCaloriesServ =  async (userData, userId) => {

    let result; 

    try{
        console.log(userData)
        const additionalOption = await dal.getAdditionalOptionForCalories(userData.knowledgeBazeForCaloryId);
        result = (((10 * userData.weight) + (6.25 * userData.height) + (5 * userData.age) + Number.parseInt(userData.gender === 'Male' ? 5 : -161)) * Number.parseFloat(additionalOption.result)) - (userData.healthProblems ? 250 : 0);
        userData.calories = result;
        await dal.saveToProfile(userData, userId);
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    } 

    return userData;
}

const getProfileServ = async (userId) => {

  let result; 

  try{
    result = await dal.getProfile(userId);
  } catch (error) {
      throw new ErrorHandler(500, err[500]);
  } 

  return result;
}

const paymentServ = async (paymentData) => {
  console.log('paymentData', paymentData)
  let {amount, id} = paymentData;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment);
    return {message: "Payment success", success: true}
  } catch (err) {
    throw new ErrorHandler(500, err[500]);
  }
} 

const getExercisesAndTrainerServ = async (id, userData) => {
  let response;
  try {
    const met = ((userData.usualyCalories - userData.caloriesProfile) * 200) / (3.5 * userData.time * userData.weight);
    console.log(met)
    const exercises = await dal.getExercisesAndTrainerDal(met, userData.typeOfFitness);
    console.log('exercises', exercises)
    const trainer = await dal.getTrainerByTypeOfFitness(userData.typeOfFitness);
    response = {exercises: {...exercises}, trainer: [...trainer]}
    await dal.updateProfileForTrainer({trainer: trainer[0], caloriesPerDay: userData.usualyCalories, timeForTraining: userData.time, userId: id});
  } catch (err) {
    throw new ErrorHandler(500, err[500]);
  }
  return response;
}

module.exports = {
  getCaloriesServ,
  getProfileServ,
  paymentServ,
  getExercisesAndTrainerServ
}