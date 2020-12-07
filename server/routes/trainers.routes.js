const controller  = require("../controllers/index");

let routerTrainers = require("express").Router();

routerTrainers.get(
    '/trainerList',
    controller.getListTrainers
);

module.exports=routerTrainers;