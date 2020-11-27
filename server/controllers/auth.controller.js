const Service = require('../services/index');
const { validationResult } = require('express-validator');
const {ErrorHandler} = require('../middleware/errors/error');
const err = require('../middleware/errors/errors.const');
const mail = require('../middleware/mail/send.mail');

const registration = async function registration(req, res, next){

    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // return res.status(400).json({
            //     message: errors.errors[0]["msg"]
            // })
            throw new ErrorHandler(400, err[400]);
        }

        const regForm=req.body;

        await Service.registrationServ(regForm).then(data => {
            mail(regForm.email, regForm.login);
            res.status(201).json({message: data});
        }).catch(error=> {
            // res.status(400).json({message: err});
            throw new ErrorHandler(400, err[400]);
        })

        next();
    }catch(error){
        next(error);
    }

}

const login = async function login(req, res, next){

    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // return res.status(400).json({
            //     message: errors.errors[0]["msg"]
            // })
            throw new ErrorHandler(400, err[400]);
        }   

        const loginForm=req.body;

        await Service.loginServ(loginForm).then(data => {
            res.status(200).json({message: data});
        }).catch(err => {
            // res.status(400).json({message: ""});
            throw new ErrorHandler(400, err[400]);
        })

        next();
    }catch(error){
        next(error);
    }
}

const activate = async function activate(req, res, next){
    try{
        // console.log(req.params.login);
        const login=req.params.login;
        if(!login){
            throw new ErrorHandler(400, err[400]);
        }

        await Service.activateServ(login)
        .then(data => { console.log(data)
            res.status(200).json({message: data});
        })
        .catch(err =>{
            throw new ErrorHandler(400, err[400]);
        })

        next();
    }catch(error){
        next(error);
    }
}


module.exports={
    registration,
    login,
    activate
}