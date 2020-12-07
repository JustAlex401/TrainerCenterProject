const {db} = require("../models/db");
const Trainer = db.trainer;
const User = db.user;

const getListTrainers = async function getListTrainers () {


    const data = await Trainer.findAll({
        include: [
            {
                model: User,
                require: true
            }
        ]
    })

    return data;
}

module.exports = {
    getListTrainers
}