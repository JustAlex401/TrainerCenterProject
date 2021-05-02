const dal = require('../dal/index');
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");

const getCaloriesServ =  async (userData, userId) => {

    let result; 

    console.log('userData', userData);
    try{
        const additionalOption = await dal.getAdditionalOptionForCalories(userData.knowledgeBazeForCaloryId);
        result = (10 * userData.weight) + (6.25 * userData.height) + (5 * userData.age) + Number.parseInt(userData.gender === 'Male' ? 5 : -161);
        const saveProfile = await dal.saveToProfile(userData, userId, result);
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    } 

    return result;
}

module.exports = {
  getCaloriesServ
}