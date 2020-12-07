const {check} = require('express-validator');
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
    controller.login
);

routerAuth.get(
    '/activate',
    controller.activate
);

routerAuth.post(
    '/logout',
    controller.logout
)




module.exports=routerAuth;

