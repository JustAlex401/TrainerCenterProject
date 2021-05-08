const dbConfig = require('config');
const Sequelize = require("sequelize");
const {userCr} = require("./user.model");
const {roleCr} = require("./role.model");
const {trainerCr} = require('./trainer.model')
const {profileCr} = require('./profile.model');
const {knowledgeBazeForCaloriesCr} = require('./knowledgeBazeForCalories.model');
const {purchaseOfSubscriptionsCr} = require('./purchaseOfSubscriptions.model');
const {typesOfFitnessCr} = require('./typesOfFitness.model');
const {caloriesAndExercisesCr} = require('./caloriesAndExercises.model')

sequelize = new Sequelize(dbConfig.get("DB"), dbConfig.get("USER"), dbConfig.get("PASSWORD"),
  {
    host: dbConfig.get("HOST"),
    dialect: dbConfig.get("dialect"),
    operatorsAliases: false,
    define: {
      timestamps: false
    },
 
  pool: {
    max: dbConfig.get("pool").get("max"),
    min: dbConfig.get("pool").get("min"),
    acquire: dbConfig.get("pool").get("acquire"),
    idle: dbConfig.get("pool").get("idle"),
  }
 });

 const user = userCr(sequelize, Sequelize);
 const role = roleCr(sequelize, Sequelize);
 const typesOfFitness = typesOfFitnessCr(sequelize, Sequelize);
 const caloriesAndExercises = caloriesAndExercisesCr(sequelize, Sequelize);
 const trainer = trainerCr(sequelize, Sequelize);
 const profile = profileCr(sequelize, Sequelize);
 const KnowledgeBazeForCalories = knowledgeBazeForCaloriesCr(sequelize, Sequelize);
 const purchaseOfSubscriptions = purchaseOfSubscriptionsCr(sequelize, Sequelize);

 const db = {
  user: user,
  role: role,
  typesOfFitness: typesOfFitness,
  caloriesAndExercises: caloriesAndExercises,
  trainer: trainer,
  profile: profile,
  KnowledgeBazeForCalories: KnowledgeBazeForCalories,
  purchaseOfSubscriptions: purchaseOfSubscriptions,
  Sequelize: Sequelize,
  sequelize: sequelize
 }

db.trainer.hasOne(db.user);
db.role.hasMany(db.user);
db.typesOfFitness.hasMany(db.trainer);
db.typesOfFitness.hasMany(db.caloriesAndExercises);
db.user.hasOne(db.profile);
db.KnowledgeBazeForCalories.hasMany(db.profile);
db.user.hasMany(db.purchaseOfSubscriptions);

 module.exports = {
  db
}