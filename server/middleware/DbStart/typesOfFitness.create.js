
const typesOfFitness = async (db) => {

  try{

    const data = await db.sequelize.query(
      `select * from typesOfFitnesses;`  
    );


    if(!data[0][0]){
      await db.typesOfFitness.bulkCreate([
        {typeOfFitness: 'Bodybuilding'},
        {typeOfFitness: 'Stretching'},
        {typeOfFitness: 'Crossfit'},
        {typeOfFitness: 'Powerlifting'},
        {typeOfFitness: 'Yoga'}
      ]);
    }

  }catch(err) {
    console.log(err.message)
  };
}

module.exports=typesOfFitness;