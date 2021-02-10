const config = require('config');
const bcrypt = require('bcrypt');

const trainer = async function trainer (db){
  const hashedPassword = await bcrypt.hash("trainer", 12);

  const t = await db.sequelize.transaction();
    try{

        let trainerId;

        await db.trainer.create({
            name: 'Alex',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 20,
            weight: 90,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        }).catch(err => {
            console.log(err.message);
        })

        await db.user.create({
            email: "trainer@mail.ru",
            login: "trainer",
            password: `${hashedPassword}`,
            active: 1,
            role_id: 3,
            trainerId: trainerId,
        }, { transaction: t }).then(data => {
            // console.log(data)
        }).catch(err=> {
            console.log(err.message)
        });

        await t.commit();

    } catch (err) {
        console.log(err.message);
        await t.rollback();
    }
}

module.exports=trainer;