

const knowledgeBazeForCaloriesCr = (sequelize, Sequelize) => {

  const KnowledgeBazeForCalories = sequelize.define("knowledgeBazeForCalories", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: Sequelize.STRING,
      require: true,
    },

    result: {
      type: Sequelize.DECIMAL(5, 4),
      require: true,
    }},

    {
      indexes: [
        {
          unique: true,
          fields: ['id']
        }
      ]
    }
  )

  return KnowledgeBazeForCalories;
}

module.exports ={
  knowledgeBazeForCaloriesCr 
}