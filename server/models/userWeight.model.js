
const userWeightCr = (sequelize, Sequelize) => {

  const userWeight = sequelize.define("userWeight", {
      
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },

      weight: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      date: {
        type: Sequelize.DATE,
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

  return userWeight;

}

module.exports = {
  userWeightCr
}



