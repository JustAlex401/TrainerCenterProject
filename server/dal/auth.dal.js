const {db} = require("../models/db");
const bcrypt = require('bcrypt');
const User = db.user;

const reg = async function reg(regForm){

    const hashedPassword = await bcrypt.hash(regForm.password, 12);

    regForm.password=hashedPassword;
    regForm.active=0;

    await User.create(regForm).then(data=>{
        console.log(data);
    }).catch(err => {
        throw err.message;
    });

    return "User was created";
}


module.exports = {
    reg,
}