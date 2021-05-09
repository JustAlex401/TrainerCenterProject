import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileForTraining } from '../actions';
import M from 'materialize-css';
import { getExercisesAndTrainers } from './actions';
import TrainerList from '../../../trainerList/TrainerList';
import './trainingProgramm.css';

const TrainingProgramm = () => {

  const profileData = useSelector(state => state.profile.data);
  const id = useSelector(state => state.user.data.userId);
  let resultExercisesAndTrainers = useSelector(state => state.exercises.data);
  const [oneMore, setOneMore] = useState();
  const dispatch = useDispatch();
  const [disable, setDisable] = useState();
  const [data, setData] = useState({
    usualyCalories: 0 ,
    caloriesProfile: 0,
    time: 0,
    weight: 0,
    typeOfFitness: 0,
  }); 

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [])

  useEffect(async () => {
    dispatch(getUserProfileForTraining());
  }, [id])

  useEffect(() => {
    setData({...data, ['weight']: profileData.weight, ['caloriesProfile']: profileData.calories})
  }, [profileData])

  useEffect(() => {
    if(data.usualyCalories && data.time && data.typeOfFitness && data.weight && data.caloriesProfile && !(data.usualyCalories < data.caloriesProfile)){
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [data])

  useEffect(() => {
    console.log(data)
  }, [data])

  const getExercises = async () => {
    dispatch(getExercisesAndTrainers(data));
    setOneMore(false);
  }

  useEffect(() => {
    console.log(oneMore)
  }, [oneMore])

  // const handleOneMore = () => {
  //   setOneMore(true);
  // }

  return ( 
    <div style={{height: '700px', overflow: 'auto'}}>
      {!resultExercisesAndTrainers?.trainer ?
        // oneMore ?
          <div className="col container center" style={{marginTop: '50px'}}>
            <p style={{color: 'white', fontSize: '20px', marginBottom: '50px'}}>Enter your data for selection a training: </p>
            <div className='input-field row' style={{width: '400px', marginBottom: '30px'}}>
              <input className="Inp" id='usualyCalories' type="number" name='usualyCalories' onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}} autoComplete='off'/>
              <label className='labelStyle' for='usualyCalories'>{data.usualyCalories > data.caloriesProfile ? 'calories you eat per day (kcals)' : 'this calories should be more thaan calories in profile'}</label>
            </div>
            <div className='input-field row' style={{width: '400px', marginBottom: '30px'}}>
              <input className="Inp" id="time" type="number" name='time' onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}} autoComplete='off'/>
              <label className='labelStyle' for='time'>Time (min)</label>
            </div>
            <div className="input-field col container center" style={{width: '400px', marginBottom: '40px'}}>
              <select className="selectStyle" name="typeOfFitness" onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}}>
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Bodybuilding</option>
                <option value="2">Stretching</option>
                <option value="3">Crossfit</option>
                <option value="4">Powerlifting</option>
                <option value="5">Yoga</option>
              </select>
            </div>
            <div style={{marginTop: '30px'}}>
              <button className="waves-effect waves-light btn" disabled={disable} onClick={getExercises}>Ok</button>
            </div>
          </div>
      :
        <div className="col" style={{marginTop: '50px'}}>
          <div className="col container" style={{width: '500px'}}>
            {/* <p style={{color: 'white', fontSize: '18px'}}>You can use this exercises for training for lose calories:</p> */}
            {resultExercisesAndTrainers?.exercises?.limit && 
              <p style={{color: 'white', fontSize: '20px'}}>You can use this exercises spending more time for training</p>
            }
            <ul className="collection with-header listExercises">
              <li className="collection-header listItemForExercises" style={{color: 'white', borderBottom: '2px solid #FFD700'}}><h4>List of exercises</h4></li>
              {
                resultExercisesAndTrainers?.exercises?.exercises.map((trainer, i) => {
                  return (
                    <li className="collection-item listItemForExercises" style={{color: 'white', fontSize: '18px'}}>{i+1}. {trainer.exercise}</li>
                  )
                })
              }
            </ul>

          </div>
          <div className='col container center'>
            <p style={{color: 'white', fontSize: '18px', marginTop: '60px'}}>Your trainer</p>
          </div>
          {
            resultExercisesAndTrainers?.trainer?.map((trainer, i) => {
              return (
                <TrainerList 
                  trainer={trainer}
                  key={i}
                  index={i}
                />
              )})
          }
          {/* <div className="col container center" style={{marginTop: '30px', marginBottom: '30px'}}> 
            <button className="waves-effect waves-light btn" onClick={() => {resultExercisesAndTrainers = {};}}>Change exercises</button>
          </div> */}
        </div>
      }
    </div>
  )
}

export default TrainingProgramm;