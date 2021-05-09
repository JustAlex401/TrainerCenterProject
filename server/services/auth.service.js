const dal = require('../dal/index');
const config = require('config');
var CryptoJS = require("crypto-js");
const message = require('../resources/const.string');
const bcrypt = require('bcrypt');
const mail = require('../mail/send.mail');
const randtoken = require('rand-token') 
const jwt = require('jsonwebtoken');
const rediscl = require('../middleware/redis/redis.generate');
const err = require('../middleware/errors/errors.const');
const { ErrorHandler } = require("../middleware/errors/error");


const registrationServ = async function registrationServ(regForm){

    try{
        const hashedPassword = await bcrypt.hash(regForm.password, 12);

        regForm.password=hashedPassword;
        regForm.active=0;
        regForm.roleId=2;

        const user = await dal.registration(regForm);
        
        if(!user){
            throw new ErrorHandler(400, err[400]);
        }

        const hashLogin = CryptoJS.AES.encrypt(regForm.login, config.get('jwtSecret')).toString();
        const html = `<a href="http://localhost:3000/api/auth/activate?login=${hashLogin}">Verify</a>`

        mail(regForm.email, html);
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return message.usCr;
}

const loginServ = async function loginServ(loginForm){

    let user;

    try{
        user = await dal.login(loginForm);

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
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return user;
}

const activateServ = async function activateServ(login){

    try{
        login = login.replace(/ /g, "+");
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
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return message.act;
}

const logoutServ = async function logoutServ(usId){

    try{
       await rediscl.del(usId);
    } catch (error) {
        throw new ErrorHandler(500, err[500]);
    }

    return message.logout;
}

module.exports = {
    registrationServ,
    loginServ,
    activateServ,
    logoutServ
}