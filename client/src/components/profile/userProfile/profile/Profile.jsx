import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainerList from '../../../trainerList/TrainerList';
import { getUserProfileForTraining } from '../actions';
import './profile.css';
import M from 'materialize-css';
import { getPayments } from '../subscription/actions';
import axios from 'axios';

const Profile = () => {

  const id = useSelector(state => state.user.data.userId);
  const login = useSelector(state => state.user.data.login);
  const profile = useSelector(state => state.profile.data);
  // const exercisesAndTrainer = useSelector(state => state.exercises.data);
  const [response, setResponse] = useState();
  const payments = useSelector(state => state.payments.data);
  const dispatch = useDispatch();
  const [dataForWeight, setDataForWeight] = useState({
    date: '',
    time: '',
    weight: 0
  });

  useEffect(() => {
    dispatch(getPayments());
  }, [])

  useEffect(async () => {
    dispatch(getUserProfileForTraining());
  }, [id])

  useEffect(() => {
    console.log(dataForWeight)
  }, [dataForWeight])

  useEffect(() => {
    const elems1 = document.querySelectorAll('.modal');
    M.Modal.init(elems1, {});
    // const elems2 = document.querySelectorAll('.datepicker');
    // M.Datepicker.init(elems2, {});
    // const elems3 = document.querySelectorAll('.timepicker');
    // M.Timepicker.init(elems3, {});
  }, [])

  useEffect( async () => {
    const getWeights = await axios.get(`/api/user/get-weight/${id}`);
    setResponse(getWeights)
  }, []);

  const handleClick = async () => {
    const response2 = await axios.post(`/api/user/push-weight/${id}`, dataForWeight);
    setResponse(response2)
  }

  return (
    <div style={{height: '700px', overflow: 'auto'}}>
      <div className='col container center'>
        {/* {console.log(payments)} */}
        <p style={{color: 'white', fontSize: '30px'}}>profile</p>
      </div>
      <div className='col container' style={{maxWidth: '350px'}}>
        <p className='pStyle'>Login: {login}</p>
        <p className='pStyle'>Gender: {profile.gender}</p>
        <p className='pStyle'>Age: {profile.age} years</p>
        <p className='pStyle'>Weight: {profile.weight} kg</p>
        <p className='pStyle'>Height: {profile.height} cm</p>
        <p className='pStyle'>Calories: {profile.calories} kcals</p>
      </div>
      <div className="center modal1Exercises" style={{marginTop: '50px'}}>
        <button data-target="modal1" class="btn modal-trigger">Exercises and trainer</button>
        <div className="col modal modal1StyleForProfile" id="modal1" style={{marginTop: '30px'}}>
        {/* < div className="col center" style={{width: '500px'}}> */}
          {profile?.trainer &&
            <div style={{width: '100%'}}>
              <div className="container col center">
                <p style={{color: 'white', fontSize: '18px'}}>
                  Trainer: 
                </p>
              </div>
              <div>
                {profile?.trainer.map((trainer, i) => {
                return (
                  <TrainerList 
                    trainer={trainer}
                    key={i}
                    index={i}
                  />
                )})}
              </div>
              <div className="col container" style={{marginBottom: '30px', width: '400px'}}>
                <ul className="collection with-header listExercises">
                  <li className="collection-header listItemForExercises" style={{color: 'white', borderBottom: '2px solid #FFD700'}}><h4>List of exercises</h4></li>
                  {
                    profile?.exercises?.map((exercise, i) => {
                      return (
                        <li className="collection-item listItemForExercises" style={{color: 'white', fontSize: '18px'}}>{i+1}. {exercise.name}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="center  modal2Payments" style={{marginTop: '50px'}}>
        <button data-target="modal2" class="btn modal-trigger">List of payments</button>
          <div className="col modal" id="modal2" style={{marginTop: '30px'}}>
            {payments.length ?
                <div>
                  <ul className="collection with-header listPayments" style={{color: 'white'}}>
                    <li className="collection-header listItemForPayments" style={{color: 'white'}}><h4>Payments</h4></li>
                    {
                      payments.map((item) => {
                        return (
                          <li className="collection-item listItemForPayments" style={{color: 'white'}}>
                            price: {item.price} | numberVisits: {item.numberWorkouts} | date: {item.purchaseDate}
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              :
                <div>
                  <p style={{color: 'white', fontSize: '20px', marginTop: '30px'}}>You haven't payments</p>
                </div>
            }
          </div>

      </div>
      <div className="center modal3Payments" style={{marginTop: '50px'}}>
        <button data-target="modal3" className="btn modal-trigger">Weight Controller</button>
          <div className="col modal modal3Style" id="modal3" style={{marginTop: '30px', height: '700px', marginTop: '0px !important'}}>
            <div className="col container center">
              <p style={{color: 'white', fontSize: '20px'}}>Your personal weight controller</p>
            </div>

            {/* <div className='input-field row container center' style={{width: '400px'}}>
              <input type="text" className="datepicker" onSelect={aaa}/>
              <label className='labelStyle' for='date' style={{width: '380px'}}>Date</label>
            </div>
            <div className='input-field row container center' style={{width: '400px'}}>
              <input type="text" name="time" id="time" onSelect={(e) => {setDataForWeight({...dataForWeight, ['time']: e.target?.M_Datepicker?.time + e.target?.M_Datepicker?.amOrPm})}} className="timepicker" style={{width: '390px'}}/>
              <label className='labelStyle' for='time' style={{width: '380px'}}>Time</label>
            </div> */}

            <div className='input-field row left-align' style={{width: '400px', marginBottom: '30px'}}>
              <input className="Inp" id="weight" type="number" name='weight' style={{width: '300px', marginRight: '20px'}} onChange={(e) => {setDataForWeight({...dataForWeight, [e.target.name]: e.target.value})}}/*autoComplete='off'*//>
              <label className='labelStyle' for='weight'>Weight</label>
              <button className="waves-effect waves-light btn" onClick={handleClick}>send</button>
            </div>

            <div className="divider container center" style={{ color: 'white', marginBottom: '50px', width: '90%'}}></div>
            <ul className="collection with-header listPayments" style={{color: 'white'}}>
              {
                response?.data?.map((item) => {
                  return (
                    <li className="collection-item listItemForPayments" style={{color: 'white'}}>weight: {item.weight} | date: {item.date}</li>
                  )
                })
              }
            </ul>
          </div>
      </div>
    </div>
  )
}

export default Profile;