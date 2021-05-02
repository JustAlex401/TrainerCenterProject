const config = require('config');
const dbConfig = require('config');

const knowledgeBazeForCaloriesCr = async function knowledgeBazeForCaloriesCr (db){

  const t = await db.sequelize.transaction();

  try{

    const data = await db.sequelize.query(
      `select * from knowledgeBazeForCalories;`  
    );

    console.log(data[0][0])

    if(!data[0][0]){
      await db.KnowledgeBazeForCalories.create({
        name: 'I have no physical activity and a sedentary job',
        result: 1.2
      },  { transaction: t });

      await db.KnowledgeBazeForCalories.create({
        name: 'I do small jogging or light gymnastics 1-3 times a week',
        result: 1.375
      },  { transaction: t });

      await db.KnowledgeBazeForCalories.create({
        name: 'I do sports with medium loads 3-5 times a week',
        result: 1.55
      },  { transaction: t });

      await db.KnowledgeBazeForCalories.create({
        name: 'I exercise fully 6-7 times a week',
        result: 1.725
      },  { transaction: t });

      await db.KnowledgeBazeForCalories.create({
        name: 'My work is related to physical labor, I train 2 times a day and include strength exercises in the training program',
        result: 2
      },  { transaction: t });
    }

    await t.commit();

  } catch (err) {
    console.log(err)
    await t.rollback();
  };
}

module.exports=knowledgeBazeForCaloriesCr;