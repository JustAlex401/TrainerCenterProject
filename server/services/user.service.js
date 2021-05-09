const dal = require('../dal/index');
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const config = require('config');
const trainer = require('../middleware/DbStart/trainer.create');
const mail = require('../mail/send.mail');
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
    console.log('amount', amount)
    if(amount) {
      const payment = await stripe.paymentIntents.create({
        amount: Number.parseInt(amount) * 100,
        currency: "USD",
        description: "Training",
        payment_method: id,
        confirm: true
      })
      console.log("Payment", payment);
    }
    if(!amount) {
      const paymentsRes = await dal.getPaymentsForUser(paymentData.userId); 
      console.log('paymentsPeassssssssssss', paymentsRes);
      const aaa = paymentsRes.find((item) => {
        return item.numberWorkouts === 'trial';
      })
      console.log('AAA', aaa)
      if(aaa){
        return {message: 'You can buy only one trial viisit'}
      }
    }
    await dal.createPayment(paymentData);
    const exercisesPerUser = await dal.getExercisePerUser(paymentData.userId);
    console.log("nnnnnnnnnn", exercisesPerUser);
    const trainerUser = await dal.getTrainerDataForEmail(paymentData.userId);
    console.log("bbbbbbbbb", trainerUser);
    if(exercisesPerUser.length && trainerUser.trainer && trainerUser.user) {
      const resExercisesArr = exercisesPerUser.map((item) => {
        return item.name;
      }).toString();
      mail(trainerUser.trainer.email,
        `
          <div>
            <h4>User Email: ${trainerUser.user.email}</h4>
            <h4>Exercises:</h4>
            <p>${resExercisesArr}</p>
          </div>

        `  
      );
    }
    return {message: "Payment success", success: true};
  } catch (error) {
    console.log(error);
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
    await dal.exercisesPerUser(id, exercises.exercises);
    const trainer = await dal.getTrainerByTypeOfFitness(userData.typeOfFitness);
    response = {exercises: {...exercises}, trainer: [...trainer]}
    await dal.updateProfileForTrainer({trainer: trainer[0], caloriesPerDay: userData.usualyCalories, timeForTraining: userData.time, userId: id});
  } catch (err) {
    throw new ErrorHandler(500, err[500]);
  }
  return response;
}

const getPaymentsForUserServ = async (id) => {
  let data;
  try{
    data = await dal.getPaymentsForUser(id);
    console.log(data)
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  return data;
}

const pushWeightServ = async (id, weightData) => {
  let result;
  console.log("VVVVVVVVVVVVVVVVVVVVVV")
  try{
    await dal.pushWeight(id, weightData.weight);
    result = await dal.getWeights(id);
    if(result.length % 3 === 0){
      const exercisesPerUser = await dal.getExercisePerUser(id);
      console.log("nnnnnnnnnn", exercisesPerUser);
      const trainerUser = await dal.getTrainerDataForEmail(id);
      console.log("bbbbbbbbb", trainerUser);
      if(exercisesPerUser.length && trainerUser.trainer && trainerUser.user) {
        const resWeights = result.map((item) => {
          return JSON.stringify({date: item.date, weight: item.weight});
        }).toString();
        mail(trainerUser.trainer.email,
          `
            <div>
              <h4>User Email: ${trainerUser.user.email}</h4>
              <h4>Weights:</h4>
              <p>${resWeights}</p>
            </div>
  
          `  
        );
      }
    }
    console.log(result)
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  return result;
}

const getWeightServ = async (id) => {
  let result;
  try{
    result = await dal.getWeights(id);
    console.log("AAAA", result)
  } catch (error) {
    console.log(error)
    throw new ErrorHandler(500, err[500]);
  }
  return result;
}

module.exports = {
  getCaloriesServ,
  getProfileServ,
  paymentServ,
  getExercisesAndTrainerServ,
  getPaymentsForUserServ,
  pushWeightServ,
  getWeightServ
}