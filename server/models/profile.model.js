
const profileCr = (sequelize, Sequelize) => {

  const Profile = sequelize.define("profile", {

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    calories: {
        type: Sequelize.INTEGER,
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



