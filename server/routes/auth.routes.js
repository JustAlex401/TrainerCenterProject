const {check} = require('express-validator');
// const controller  = require("../controllers/auth.controller.js");
const controller  = require("../controllers/index");

let routerAuth = require("express").Router();

routerAuth.post(
    "/registration", 
    [
        check('password', "Length of password must be more than 4").isLength({min:4})
    ],
    controller.registration
);

routerAuth.post(
    "/login", 
    [
        check('password', "Enter password").exists
    ],
    controller.login
);

routerAuth.get(
    '/activate/:login',
    controller.activate
);


module.exports=routerAuth;

