const dbConfig = require('config');
const Sequelize = require("sequelize");
const {userCr} = require("./user.model");
const {roleCr} = require("./role.module");
const {trainerCr} = require('./trainer.module')

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
 const trainer = trainerCr(sequelize, Sequelize);

 const db = {
   user: user,
   role: role,
   trainer: trainer,
   Sequelize: Sequelize,
   sequelize: sequelize
 }



db.trainer.hasOne(db.user);
db.user.belongsTo(db.trainer);

 module.exports = {
    db
}