const config = require('config');

const admin = async function admin (db){
  await db.user.create({
    email: `${config.get('adminEmail')}`,
    login: `${config.get('adminLogin')}`,
    password: `${config.get('adminPassword')}`,
    active: 1,
    role_id: 1
  }).catch(err=> {
    console.log(err.message)
  });
}

module.exports=admin;