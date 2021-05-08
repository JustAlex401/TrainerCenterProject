
const typesOfFitnessCr = (sequelize, Sequelize) => {

  const typesOfFitness = sequelize.define("typesOfFitness", {
      
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },

      typeOfFitness: {
        type: Sequelize.STRING,
        allowNull: false,
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

  return typesOfFitness;

}

module.exports = {
  typesOfFitnessCr
}



