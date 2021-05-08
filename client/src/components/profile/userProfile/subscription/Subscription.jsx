import React, { useEffect, useState } from 'react';
import workoutArray from '../../../../utils/numberOfWorkouts/workoutsArray';
import NumberWorkoutCard from './numberWorkautsCard/NumberWorkoutsCard';
import Payment from './payment/Payment';
import M from 'materialize-css';
import './subscription.css'

const Subscription = () => {

  const [instance, setInstance] = useState();
  const [caseWorkouts, setCaseWorkouts] = useState();
  const [close, setClose] = useState();

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    const data = M.Modal.init(elems, {});
    setInstance(data)
  }, [close])

  useEffect(() => {
    if(close) {
      instance[0].close();
    }
    setClose(false);
  }, [close]);

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
      <div className="constainer col center" style={{marginTop: '50px'}}>
        <button data-target="modal1" className="btn modal-trigger">Pay</button>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <Payment setClose={setClose}/>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Subscription;