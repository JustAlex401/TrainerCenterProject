const dal = require('../dal/index');
const config = require('config');
var CryptoJS = require("crypto-js");
const message = require('../resources/const.string');
const bcrypt = require('bcrypt');
const mail = require('../mail/send.mail');
const randtoken = require('rand-token') 
const jwt = require('jsonwebtoken');
const rediscl = require('../middleware/redis/redis.generate');


const registrationServ = async function registrationServ(regForm){

    const hashedPassword = await bcrypt.hash(regForm.password, 12);

    regForm.password=hashedPassword;
    regForm.active=0;
    regForm.role_id=2;

    const user = await dal.registration(regForm);
    
    if(!user){
        throw new ErrorHandler(400, err[400]);
    }

    const hashLogin = CryptoJS.AES.encrypt(regForm.login, config.get('jwtSecret')).toString();

    mail(regForm.email, hashLogin);

    return message.usCr;
}

const loginServ = async function loginServ(loginForm){

    const user = await dal.login(loginForm);

    console.log(user)

    if(!user || !(user.active == 1)){
        throw new ErrorHandler(400, err[400]);
    } 

    const isMatch = await bcrypt.compare(loginForm.password, user.password);

    if(!isMatch){
        throw new ErrorHandler(400, err[400]);
    }
    
    let refresh_token = randtoken.uid(256);
    let refresh_token_maxage = new Date() + config.get("jwt_refresh_expiration");

    const userToken = {
        userId: user.id,
        role: user.role,
    }

    let token = jwt.sign(
        userToken,
        config.get('jwtSecret'),
        {expiresIn: config.get('jwt_expiration')}
    )

    rediscl.set(user.id, JSON.stringify({
        refresh_token: refresh_token,
        expires: refresh_token_maxage
        }),
        rediscl.print
    );

    user.token = token;
    user.refresh_token=refresh_token;

    return user;
}

const activateServ = async function activateServ(login){

    login = login.replace(" ", "+");
    const bytes  = CryptoJS.AES.decrypt(login, config.get('jwtSecret'));
    login = bytes.toString(CryptoJS.enc.Utf8);

    if(!login){
        throw new ErrorHandler(400, err[400]);
    }

    const data = await dal.activate(login);
    console.log(data);
    if (!data){
        throw new ErrorHandler(400, err[400]);
    }

    return message.act;
}

const logoutServ = async function logoutServ(usId){

    await rediscl.del(usId);

    return message.logout;
}

module.exports = {
    registrationServ,
    loginServ,
    activateServ,
    logoutServ
}