
const caloriesAndExercises = async (db) => {
  await db.caloriesAndExercises.bulkCreate([
    // exercise, met, typeOfFitnessId

    // Powerlifting
    {exercise: 'Back Squat', met: 14.8, typesOfFitnessId: 4},
    {exercise: 'Squat with a barbell on the back on a bench', met: 14.3, typesOfFitnessId: 4},
    {exercise: 'Squat with a barbell on the chest', met: 13.2, typesOfFitnessId: 4},
    {exercise: 'Leg press', met: 12.2, typesOfFitnessId: 4},
    {exercise: 'Barbell lunges', met: 10, typesOfFitnessId: 4},
    {exercise: 'Knee Row', met: 11.2, typesOfFitnessId: 4},
    {exercise: 'Hyperextension', met: 9.3, typesOfFitnessId: 4},
    {exercise: 'Row on straight legs', met: 13.7, typesOfFitnessId: 4},
    {exercise: 'Bends with a barbell on the shoulders', met: 12.7, typesOfFitnessId: 4},
    {exercise: 'Extension of the legs while sitting in the simulator', met: 10.6, typesOfFitnessId: 4},  
    {exercise: 'Dumbbell bench press lying on a horizontal, incline and back-incline bench', met: 11.8, typesOfFitnessId: 4},  
    {exercise: 'Dumbbell press standing or sitting', met: 11.4, typesOfFitnessId: 4},  
    {exercise: 'Pull of vertical and horizontal blocks', met: 14, typesOfFitnessId: 4},  
    {exercise: 'Extension of arms on the block', met: 10.9, typesOfFitnessId: 4},  
    {exercise: 'Barbell Curl', met: 9.8, typesOfFitnessId: 4}, 
    {exercise: 'Pull-ups', met: 10.2, typesOfFitnessId: 4},   


    // Bodybuilding
    {exercise: 'Back Squat', met: 11.8, typesOfFitnessId: 1},
    {exercise: 'Squat with a barbell on the back on a bench', met: 11.3, typesOfFitnessId: 1},
    {exercise: 'Squat with a barbell on the chest', met: 9.5, typesOfFitnessId: 1},
    {exercise: 'Extension of the legs while sitting in the simulator', met: 7.6, typesOfFitnessId: 1},  
    {exercise: 'Leg press', met: 9.1, typesOfFitnessId: 1},
    {exercise: 'Barbell lunges', met: 7, typesOfFitnessId: 1},
    {exercise: 'Knee Row', met: 8.3, typesOfFitnessId: 1},
    {exercise: 'Hyperextension', met: 6.3, typesOfFitnessId: 1},
    {exercise: 'Row on straight legs', met: 10.7, typesOfFitnessId: 1},
    {exercise: 'Bends with a barbell on the shoulders', met: 9.8, typesOfFitnessId: 1},
    {exercise: 'Dumbbell bench press lying on a horizontal, incline and back-incline bench', met: 8.8, typesOfFitnessId: 1},  
    {exercise: 'Dumbbell press standing or sitting', met: 8.5, typesOfFitnessId: 1},  
    {exercise: 'Pull of vertical and horizontal blocks', met: 11, typesOfFitnessId: 1},  
    {exercise: 'Extension of arms on the block', met: 7.9, typesOfFitnessId: 1},  
    {exercise: 'Barbell Curl', met: 6.8, typesOfFitnessId: 1}, 
    {exercise: 'Pull-ups', met: 7.2, typesOfFitnessId: 1},  
    

    // Crossfit
    {exercise: 'Jumping rope', met: 6, typesOfFitnessId: 3},
    {exercise: 'Rowing on the simulator', met: 8.3, typesOfFitnessId: 3},
    {exercise: 'Exit on the rings', met: 10.4, typesOfFitnessId: 3},
    {exercise: 'Deadlift', met: 10, typesOfFitnessId: 3},
    {exercise: 'Run', met: 6.4, typesOfFitnessId: 3},
    {exercise: 'Burpee', met: 6.4, typesOfFitnessId: 3},
    {exercise: 'Handstand push-ups', met: 9.7, typesOfFitnessId: 3},
    {exercise: 'Flip tire', met: 8.5, typesOfFitnessId: 3},
    {exercise: 'Take on the chest and push the bar', met: 7.1, typesOfFitnessId: 3},
    {exercise: 'Climbing the rope', met: 7.6, typesOfFitnessId: 3},
    {exercise: 'Throwing the ball to the floor', met: 6.9, typesOfFitnessId: 3},
    {exercise: 'Swings - swing the kettlebell in front of you', met: 6.7, typesOfFitnessId: 3},
    {exercise: 'Row of the bar to the chin from the sumo rack', met: 9.4, typesOfFitnessId: 3},
    {exercise: 'Lifting a sandbag (sandbag) on the shoulder', met: 9, typesOfFitnessId: 3},
    {exercise: 'Power press standing - press the bar from the chest while standing, without the squat', met: 8.8, typesOfFitnessId: 3},
    {exercise: 'Trasters - throwing a barbell overhead from a full squat, barbell on the chest', met: 10.8, typesOfFitnessId: 3},
    {exercise: 'Horizontal push-ups on the rings - the exercise is similar to regular push-ups on the floor, only the hands rest on the rings hanging low above the floor', met: 8, typesOfFitnessId: 3},


    // Stretching
    {exercise: 'Side Lunge Stretch', met: 7.6, typesOfFitnessId: 2},
    {exercise: 'Calf Stretch', met: 5.8, typesOfFitnessId: 2},
    {exercise: 'Chest and Shoulder Stretch', met: 5.4, typesOfFitnessId: 2},
    {exercise: 'Cobra', met: 7.2, typesOfFitnessId: 2},
    {exercise: 'Butterfly Stretch', met: 6.6, typesOfFitnessId: 2},
    {exercise: 'Reclining Figure 4', met: 5.2, typesOfFitnessId: 2},
    {exercise: 'Lying Knee-to-Chest Stretch', met: 5.7, typesOfFitnessId: 2},
    {exercise: 'Standing Hamstring Stretch', met: 6, typesOfFitnessId: 2},
    {exercise: '90/90 Stretch', met: 6.5, typesOfFitnessId: 2},
    {exercise: 'Figure Four Stretch', met: 6, typesOfFitnessId: 2},
    {exercise: 'Seated Shoulder Squeeze', met: 6.3, typesOfFitnessId: 2},
    {exercise: 'Side Bend Stretch', met: 7.1, typesOfFitnessId: 2},


    // Stretching
    {exercise: 'Down Dog on a chair', met: 6.2, typesOfFitnessId: 5},
    {exercise: 'Downward-Facing Dog', met: 6.4, typesOfFitnessId: 5},
    {exercise: 'Warrior II', met: 6.6, typesOfFitnessId: 5},
    {exercise: 'Triangle Pose', met: 6.9, typesOfFitnessId: 5},
    {exercise: 'Bridge Pose', met: 7.3, typesOfFitnessId: 5},
    {exercise: 'Seated Forward Fold', met: 7.4, typesOfFitnessId: 5},
    {exercise: 'Four-Limbed Staff Pose', met: 7.6, typesOfFitnessId: 5},
    {exercise: 'Upward-Facing Dog', met: 7.8, typesOfFitnessId: 5},
    {exercise: 'Warrior I', met: 8, typesOfFitnessId: 5},
    {exercise: 'Warrior III', met: 8.2, typesOfFitnessId: 5},
    {exercise: 'Bow Pose', met: 8.3, typesOfFitnessId: 5},
    {exercise: 'Camel Pose', met: 8.5, typesOfFitnessId: 5},
    {exercise: 'Side plank', met: 8.63, typesOfFitnessId: 5},
    {exercise: 'Revolved Triangle Pose', met: 8.7, typesOfFitnessId: 5},
    {exercise: 'Headstand', met: 8.6, typesOfFitnessId: 5},
    {exercise: 'Shoulder stand', met: 8.7, typesOfFitnessId: 5},



  ]
  ).catch(err => {
      console.log(err.message);
  })
}

module.exports=caloriesAndExercises
