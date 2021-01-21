const Service = require('../services/index');
const { validationResult } = require('express-validator');
const {ErrorHandler} = require('../middleware/errors/error');
const err = require('../middleware/errors/errors.const');

const registration = async function registration(req, res, next){

    try{

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw new ErrorHandler(400, err[400]);
        }

        const regForm=req.body;

        const data = await Service.registrationServ(regForm);

        res.status(201).json({message: data});

        next();
    }catch(error){
        console.log(error);
        next( new ErrorHandler(400, err[400]) );
    }
}



const login = async function login(req, res, next){

    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw new ErrorHandler(400, err[400]);
        }   

        const loginForm=req.body;

        const data = await Service.loginServ(loginForm);
        
        res.status(200).json({userId: data.id, token: data.token, refresh_token: data.refresh_token, role: data.role, login: data.login});

        next();
    }catch(error){
        console.log(error);
        next(new ErrorHandler(400, err[400]));
    }
}

const activate = async function activate(req, res, next){
    try{

        let login=req.query.login;
       
        const data = await Service.activateServ(login)

        res.status(200).json({message: data});

        next();
    }catch(error){
        console.log(error);
        next(new ErrorHandler(400, err[400]));
    }
}


const logout = async function logout(req, res, next){
    try{
        const usId = req.body.userId;
    
        const data = await Service.logoutServ(usId);

        res.status(200).json({message: data});

        next();
    }catch(error){
        console.log(error);
        next(new ErrorHandler(400, err[400]));
    }
}


module.exports={
    registration,
    login,
    activate,
    logout
}