const dbConfig = require('config');
const Sequelize = require("sequelize");
const {models} = require("./models");

const sequelize = new Sequelize(dbConfig.get("DB"), dbConfig.get("USER"), dbConfig.get("PASSWORD"),
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

 const db = models(sequelize, Sequelize);

 db.Sequelize = Sequelize;
 db.sequelize = sequelize;

 module.exports = {
    db
}