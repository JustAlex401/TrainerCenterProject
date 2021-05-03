
const profileCr = (sequelize, Sequelize) => {

  const Profile = sequelize.define("profile", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    age: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    weight: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    height: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    gender: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    calories: {
      type: Sequelize.DOUBLE,
      allowNull: true,
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

  return Profile;

}

module.exports = {
  profileCr
}



