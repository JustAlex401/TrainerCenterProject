 import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainerList from '../../../trainerList/TrainerList';
import { getUserProfileForTraining } from '../actions';
import './profile.css';
import M from 'materialize-css';

const Profile = () => {

  const id = useSelector(state => state.user.data.userId);
  const login = useSelector(state => state.user.data.login);
  const profile = useSelector(state => state.profile.data);
  const exercisesAndTrainer = useSelector(state => state.exercises.data);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getUserProfileForTraining());
  }, [id])

  useEffect(() => {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }, [])

  return (
    <div style={{height: '700px', overflow: 'auto'}}>
      <div className='col container center'>
        {console.log(exercisesAndTrainer)}
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
        <div className="col modal" id="modal1" style={{marginTop: '30px'}}>
        {/* < div className="col center" style={{width: '500px'}}> */}
          {exercisesAndTrainer?.trainer &&
            <div style={{width: '100%'}}>
              <div className="container col center">
                <p style={{color: 'white', fontSize: '18px'}}>
                  Trainer: 
                </p>
              </div>
              {exercisesAndTrainer?.trainer.map((trainer, i) => {
              return (
                <TrainerList 
                  trainer={trainer}
                  key={i}
                  index={i}
                />
              )})}
              <div className="col container" style={{marginBottom: '30px', width: '400px'}}>
                <ul className="collection with-header listExercises">
                  <li className="collection-header listItemForExercises" style={{color: 'white', borderBottom: '2px solid #FFD700'}}><h4>List of exercises</h4></li>
                  {
                    exercisesAndTrainer?.exercises?.exercises.map((trainer, i) => {
                      return (
                        <li className="collection-item listItemForExercises" style={{color: 'white', fontSize: '18px'}}>{i+1}. {trainer.exercise}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Profile;