
const typesOfFitness = async (db) => {

  try{

    await db.typesOfFitness.bulkCreate([
      {typeOfFitness: 'Bodybuilding'},
      {typeOfFitness: 'Stretching'},
      {typeOfFitness: 'Crossfit'},
      {typeOfFitness: 'Powerlifting'},
      {typeOfFitness: 'Yoga'}
    ]);
  
  }catch(err) {
    console.log(err.message)
  };
}

module.exports=typesOfFitness;