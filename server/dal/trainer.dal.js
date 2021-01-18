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
                select * from users join trainers on users.trainerId = trainers.id;
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