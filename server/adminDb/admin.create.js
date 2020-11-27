const config = require('config');

const admin = async function admin (db){

    // const t = await db.sequelize.transaction();
    // const Op = db.Sequelize.Op;

    // try{
        
          await db.user.create({
            email: `${config.get('adminEmail')}`,
            login: `${config.get('adminLogin')}`,
            password: `${config.get('adminPassword')}`,
            active: 1,
            role_id: 1
          }).catch(err=> {
            console.log(err.message)
          });


        // await db.role.create({
        //     role: "admin",
        //     user_id: user.dataValues.id,
        // },{ transaction: t }).catch(err => {
        //     console.log(err.message);
        // })
      
        // await t.commit();
    // }catch (err) {
    //     console.log(err.message);
    //     await t.rollback();
    // }

}

module.exports=admin;