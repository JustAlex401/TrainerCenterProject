const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

const registration = async function registration(req, res){

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.errors[0]["msg"]
        })
    }

    const regForm=req.body;

    await authService.registrationServ(regForm).then(result => {
        res.status(201).json({message: result});
    }).catch(err=> {
        res.status(400).json({message: err});
    })

}

module.exports={
    registration,
}