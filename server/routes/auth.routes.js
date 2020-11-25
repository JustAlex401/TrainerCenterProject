const {check} = require('express-validator');


module.exports = app => {
    const controller  = require("../controllers/auth.controller.js");

    let router = require("express").Router();

    router.post(
        "/registration", 
        [
            check('password', "Length of password must be more than 6").isLength({min:6})
        ],
        controller.registration);

    app.use('/api/auth', router);
};
