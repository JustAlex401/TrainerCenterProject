
const purchaseOfSubscriptionsCr = (sequelize, Sequelize) => {

  const purchaseOfSubscriptions = sequelize.define("purchaseOfSubscriptions", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    price: {
      type: Sequelize.INTEGER,
      require: true
    },

    numberWorkouts: {
      type: Sequelize.INTEGER,
      require: true
    },

    purchaseDate: {
      type: Sequelize.DATE,
      require: true
    }
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

  return purchaseOfSubscriptions;

}

module.exports = {
  purchaseOfSubscriptionsCr
}



