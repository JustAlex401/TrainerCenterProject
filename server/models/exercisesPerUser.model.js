
const exercisesPerUserCr = (sequelize, Sequelize) => {

  const exercisesPerUser = sequelize.define("exercisesPerUser", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      require: true
    },

  },
  {
      indexes: [
          {
              unique: true,
              fields: ['id']
          }
      ]
  }
  );

  return exercisesPerUser;

}

module.exports = {
  exercisesPerUserCr
}



