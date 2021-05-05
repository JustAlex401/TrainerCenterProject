import React, { useState } from 'react';
import './numberWorkoutsCard.css';

const NumberWorkoutCard = ({setCaseWorkouts, i, caseWorkouts, item}) => {

  const clickHandle = () => {
    setCaseWorkouts(i);
  }

  return (
    <div>
      <div className="workoutCard container center" style={{border: `5px solid ${caseWorkouts === i ? '#FFD700' : 'grey'}`, marginTop: '8px', marginBottom: '15px'}} onClick={clickHandle}>
        <p className="pStyleForCardWorkouts">{item.number} visits 9:00-22:00</p>
        <p className="pStyleForCardWorkouts">{item.price} $</p>
      </div>
    </div> 
  )
}

export default NumberWorkoutCard;