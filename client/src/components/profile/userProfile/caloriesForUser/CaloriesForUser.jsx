import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import './caloriesForUser.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CaloriesForUser = () => {

  const id = useSelector(state => state.user.data.userId);
  const [data, setData] = useState({
    gender: '',
    age: 0,
    height: 0,
    weight: 0,
    knowledgeBazeForCaloryId: 0,
    healthProblems: false
  }); 
  const [disable, setDisable] = useState(true);
  const [resultCalories, setResultCalories] = useState();

  useEffect(() => {
    if(data.gender && data.age && data.height && data.weight && data.knowledgeBazeForCaloryId){
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [data])

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [])

  const getUserCalories = async () => {
    const response = await axios.post(`/api/user/calories/${id}`, data);
    setResultCalories(response.data);
  }

  return ( 
    <div className='container col' style={{marginTop: '50px'}}>
      <div className='row container center'>
        <p style={{color: 'white', fontSize: '20px'}}>Answer a few questions:</p>
      </div>
      <div className='col container' style={{maxWidth: '400px', marginBottom: '30px'}}>
        <p>
          <label>
            <input className="with-gap" id='Male' name="group1" type="radio" onClick={(e) => {setData({...data, ['gender']: e.target.id})}}/>
            <span>Male</span>
          </label>
        </p>
        <p>
          <label>
            <input className="with-gap" id='Female' name="group1" type="radio" onClick={(e) => {setData({...data, ['gender']: e.target.id})}}/>
            <span>Female</span>
          </label>
        </p>
      </div>
      <div className='col container center'>
        <div className='input-field row' style={{width: '400px', marginBottom: '30px'}}>
          <input className="Inp" id="age" type="number" name='age' onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}} /*autoComplete='off'*//>
          <label className='labelStyle' for='age'>Age</label>
        </div>
        <div className='input-field row' style={{width: '400px', marginBottom: '30px'}}>
          <input className="Inp" id="height" type="number" name='height' onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}} /*autoComplete='off'*//>
          <label className='labelStyle' for='height'>Height (cm)</label>
        </div>
        <div className='input-field row' style={{width: '400px', marginBottom: '30px'}}>
          <input className="Inp" id="weight" type="number" name='weight' onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}} /*autoComplete='off'*//>
          <label className='labelStyle' for='weight'>Weight (kg)</label>
        </div>
      </div>
      <div className="input-field col container center" style={{width: '400px', marginBottom: '40px'}}>
        <select className="selectStyle" name="knowledgeBazeForCaloryId" onChange={(e) => {setData({...data, [e.target.name]: Number.parseInt(e.target.value)})}}>
          <option value="" disabled selected>Choose your option</option>
          <option value="1">I have no physical activity and a sedentary job</option>
          <option value="2">I do small jogging or light gymnastics 1-3 times a week</option>
          <option value="3">I do sports with medium loads 3-5 times a week</option>
          <option value="4">I exercise fully 6-7 times a week</option>
          <option value="5">My work is related to physical labor, I train 2 times a day and include strength exercises in the training program</option>
        </select>
      </div>
      <div className='col container' style={{width: '400px', marginBottom: '50px'}}>
        <p style={{color: 'white', fontSize: '16px'}}>Are there any serious health problems?</p>
        <div className="switch">
          <label style={{fontSize: '16px', color: 'white'}}>
            No
            <input type="checkbox" name="healthProblems" onChange={(e) => {setData({...data, [e.target.name]: e.target.checked})}}/>
            <span className="lever"></span>
            Yes
          </label>
        </div>
      </div>
      <div className='col center container'>
        <button className="waves-effect waves-light btn" disabled={disable ? 'disabled' : ''} onClick={getUserCalories}>Ok</button>
      </div>
      <div className='col container center'>
      <p style={{color: 'white'}}>Result: {resultCalories}</p>
      </div>
     
    </div>
  )
}

export default CaloriesForUser;