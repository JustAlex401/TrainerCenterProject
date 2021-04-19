const bcrypt = require('bcrypt');

const trainer = async function trainer (db){
  const hashedPassword = await bcrypt.hash("trainer", 12);

  const t = await db.sequelize.transaction();

    let trainerId;

    try{

        await db.trainer.create({
            name: 'Alex',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 20,
            weight: 90,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "trainer@mail.ru",
            login: "trainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Dima',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 30,
            weight: 110,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "dimatrainer@mail.ru",
            login: "dima-trainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Andrey',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 35,
            weight: 88,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "andreytrainer@mail.ru",
            login: "andrey-trainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Petya',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 35,
            weight: 88,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "petyatrainer@mail.ru",
            login: "petya-trainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Kolya',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique. Drawing up a meal plan (for personal clients). Conducting individual lessons on power shaping',
            age: 35,
            weight: 88,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "kolyatrainer@mail.ru",
            login: "kolya-trainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await t.commit();

    } catch (err) {
        await t.rollback();
    }
}

module.exports=trainer;