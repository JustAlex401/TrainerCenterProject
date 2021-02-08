const {db} = require("../models/db");
const Trainer = db.trainer;
const User = db.user;
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");
const {QueryTypes} = require('sequelize');

const getListTrainers = async function getListTrainers () {

    let data;

    try{
        // data = await Trainer.findAll({
        //     include: [
        //         {
        //             model: User,
        //             require: true
        //         }
        //     ]
        // })
        data = await db.sequelize.query(
            `
                select u.id, u.login, u.email, t.age, t.weight, t.name, t.character from users u join trainers t on u.trainerId = t.id;
            `
            , {type: QueryTypes.SELECT});
            console.log("AAa")
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return data;
}

module.exports = {
    getListTrainers
}