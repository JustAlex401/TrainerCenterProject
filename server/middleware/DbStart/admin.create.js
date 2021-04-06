const config = require('config');
const bcrypt = require('bcrypt');

const admin = async function admin (db){

  try{
    
    const hashedPassword = await bcrypt.hash(config.get('adminPassword'), 12);
    await db.user.create({
      email: `${config.get('adminEmail')}`,
      login: `${config.get('adminLogin')}`,
      password: `${hashedPassword}`,
      active: 1,
      roleId: 1
    });
  
  }catch(err) {
    console.log(err.message)
  };
}

module.exports=admin;