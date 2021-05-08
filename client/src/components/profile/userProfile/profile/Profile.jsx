import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileForTraining } from '../actions';
import './profile.css';

const Profile = () => {

  const id = useSelector(state => state.user.data.userId);
  const login = useSelector(state => state.user.data.login);
  const profile = useSelector(state => state.profile.data);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getUserProfileForTraining());
  }, [id])

  return (
    <div>
      <div className='col container center'>
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
    </div>
  )
}

export default Profile;