const controller  = require("../controllers/index");

let routerUsers = require("express").Router();

routerUsers.post(
  '/calories/:id',
  controller.getCalories
);

routerUsers.get(
  '/profile/:id',
  controller.getProfile
);

module.exports=routerUsers;