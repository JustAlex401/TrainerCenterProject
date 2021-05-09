const bcrypt = require('bcrypt');

const trainer = async function trainer (db){
  const hashedPassword = await bcrypt.hash("trainer", 12);

  const t = await db.sequelize.transaction();

    let trainerId;

    try{

        await db.trainer.create({
            name: 'Alex',
            photo: 'https://img.championat.com/s/735x490/news/big/o/s/trenirovka-na-biceps-i-triceps_15791820691933631682.jpg',
            character: 'Preparation of training programs for individuals and groups. Administrative work with the client base. Attraction of new clients. Demonstration and explanation of the exercise technique.',
            age: 23,
            weight: 90,
            height: 185,
            typesOfFitnessId: 3,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "alextrainer@mail.ru",
            login: "AlexTrainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Diana',
            photo: 'https://img.championat.com/s/735x490/news/big/n/w/pjat-uprazhnenij-dlja-trenirovki-doma-video_1575575829142046365.jpg ',
            character: 'I find an individual approach to everyone. I strive to improve my subordinates. And at the same time I develop myself.',
            age: 21,
            weight: 55,
            height: 167,
            typesOfFitnessId: 5,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "dianatrainer@mail.ru",
            login: "DianaTrainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
            name: 'Dmitriy',
            photo: 'https://mport.ua/i/77/12/71/771271/c0562708f6554ccb6884e4fdcb7d0aeb-quality_70Xresize_crop_1Xallow_enlarge_0Xw_1200Xh_643.jpg',
            character: 'I have been training for a long time. Aims at teaching strength training. I will share the skills and knowledge acquired at the professional level of performing on stage.',
            age: 34,
            weight: 128,
            height: 181,
            typesOfFitnessId: 1,
        },  { transaction: t }).then(data => {
            trainerId=data.dataValues.id;
        })

        await db.user.create({
            email: "dmitriytrainer@mail.ru",
            login: "DmitriyTrainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
          name: 'Vera',
          photo: 'https://cs11.pikabu.ru/post_img/big/2018/12/06/7/1544091037198643429.jpg',
          character: 'I help new people confidently enter sports life, and those who have got used to it, strengthen themselves and get the best results. Together we will build your body.',
          age: 26,
          weight: 61,
          height: 172,
          typesOfFitnessId: 2,
      },  { transaction: t }).then(data => {
          trainerId=data.dataValues.id;
      })

        await db.user.create({
            email: "veratrainer@mail.ru",
            login: "VeraTrainer",
            password: `${hashedPassword}`,
            active: 1,
            roleId: 3,
            trainerId: trainerId,
        }, { transaction: t });

        await db.trainer.create({
          name: 'Nikita',
          photo: 'https://www.m24.ru/b/d/nBkSUhL2hFEmkc21Lr6BvMKnxdDs9Zu-zibGnuWR9mOBdDebBizCnTY8qdJf6ReJ58vU9meMMok3Ee2nhSR6ISeO9G1N_wjJ=HWyjsKrnBnHydzt7y7JOmQ.jpg',
          character: 'I am engaged in collective training in various directions and realizations. Striving to develop a love for sports. I download the training schemes and adjust them.',
          age: 27,
          weight: 85,
          height: 192,
          typesOfFitnessId: 4,
      },  { transaction: t }).then(data => {
          trainerId=data.dataValues.id;
      })

        await db.user.create({
            email: "nikitatrainer@mail.ru",
            login: "NikitaTrainer",
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