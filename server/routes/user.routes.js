const controller  = require("../controllers/index");

let routerUsers = require("express").Router();

routerUsers.post(
    '/calories/:id',
    controller.getCalories
);

module.exports=routerUsers;