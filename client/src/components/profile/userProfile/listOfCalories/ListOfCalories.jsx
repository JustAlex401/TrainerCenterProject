import React, { useState } from 'react';
import './listOfCalories.css';
import axios from 'axios';
import CardForCalories from './cardForCalories/CardForCalories';
import searchIcon from '../../../../utils/images/search-in-mail.png';
import notFoundIcon from '../../../../utils/images/error.png';

const ListOfCalories = () => {

  const [searchWord, setSearchWord] = useState();
  const [searchError, setSearchError] = useState();
  const [dishCalories, setDishCalories] = useState();
  const [firstTime, setFirstTime] = useState(true);

  const changeHandler = event => {
    setSearchWord(event.target.value);
  }

  const searchHeader = async () => {
    try{
      const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${process.env.REACT_APP_FOOD_API_KEY}&query=${searchWord}`);
      if(!searchWord || response.data.totalHits === 0){
        setSearchError(true);
      } else {
        setSearchError(false);
      }
      setDishCalories(response.data.foods);
      console.log(response);
      setFirstTime(false);
    } catch (err) {
      console.log(err);
      setSearchError(true);
    }
  }

  return ( 
    <div className='col s12' style={{height: '600px'}}>
      <div className="row rootListCalories">
        <div className="input-field col s8 offset-s2">
          <i className="material-icons prefix inp" style={{cursor: 'pointer'}} onClick={searchHeader}>search</i>
          <input placeholder="search" id="icon_prefix" type="text" class="validate" onChange={changeHandler}></input>
        </div>
      </div>
      {firstTime &&
          <div className='container center'>
            <img src={searchIcon} style={{height: '50px'}}></img>
            <p style={{color: 'white', fontSize: '20px'}}>You can find some dish ...</p>
          </div>}
      <div className='col cards'>
        {!searchError ?
            dishCalories?.slice(0,10).map((item) =>{
              if(item){
                return (
                  <CardForCalories foodItem={item}/>
                )
              }
            })
          :
            <div className="col container center errorText">
              <img src={notFoundIcon} alt='000' style={{height: '70px'}}></img>
              <p style={{color: 'white', textAlign: 'center', fontSize: '20px', marginTop: '20px'}}>Unfortunately, we could not find this dish!..</p>
            </div>
        }
      </div>
    </div>
  )
}

export default ListOfCalories;