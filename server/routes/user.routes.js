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

routerUsers.post(
  '/payment/',
  controller.payment
);

routerUsers.post(
  '/exercises-and-trainers/:id',
  controller.getExercisesAndTrainer
)

routerUsers.get(
  '/payments/:id',
  controller.getPaymentsForUser
)

module.exports=routerUsers;