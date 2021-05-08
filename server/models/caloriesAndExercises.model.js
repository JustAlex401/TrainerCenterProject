
const caloriesAndExercisesCr = (sequelize, Sequelize) => {

  const caloriesAndExercises = sequelize.define("caloriesAndExercises", {
      
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },

      exercise: {
        type: Sequelize.STRING,
        require: true
      },

      met: {
        type: Sequelize.DECIMAL(4, 2),
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

  return caloriesAndExercises;

}

module.exports = {
  caloriesAndExercisesCr
}



