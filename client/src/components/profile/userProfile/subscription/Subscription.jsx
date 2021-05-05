import React, { useEffect, useState } from 'react';
import workoutArray from '../../../../utils/numberOfWorkouts/workoutsArray';
import NumberWorkoutCard from './numberWorkautsCard/NumberWorkoutsCard';

const Subscription = () => {

  const [caseWorkouts, setCaseWorkouts] = useState();

  return (
    <div style={{height: '1000px', overflow: 'auto'}}>
      <div className="col container center">
        {console.log(caseWorkouts)}
        <p style={{color: 'white', marginTop: '50px', fontSize: '20px', marginBottom: '30px'}}>Choose your training variant:</p>
        <div>
          {workoutArray.map((item, i) => {
            return(
              <NumberWorkoutCard 
                setCaseWorkouts={setCaseWorkouts}
                caseWorkouts={caseWorkouts}
                i={i}
                item={item}
              />
            )
          })
          }
        </div>
      </div>
    </div> 
  )
}

export default Subscription;