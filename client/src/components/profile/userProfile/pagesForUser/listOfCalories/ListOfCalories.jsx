import React, { useState } from 'react';
import './ListOfCalories.css';
import axios from 'axios';

const ListOfCalories = () => {

  const [searchWord, setSearchWord] = useState();

  const changeHandler = event => {
    setSearchWord(event.target.value);
  }

  const searchHeader = () => {
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=UYHnZBQRBuQvafKlrcBLe5cw5q4rmPkorMZPdiwh&query=${searchWord}`).then(response => {
      console.log(response)
    });
  }

  return ( 
    <div className='col rootListCalories s12'>
      <div className="row">
        <div className="input-field col s8 offset-s2">
          <i className="material-icons prefix inp" style={{cursor: 'pointer'}} onClick={searchHeader}>search</i>
          <input placeholder="search" id="icon_prefix" type="text" class="validate" onChange={changeHandler}></input>
          {console.log(searchWord)}
        </div>
      </div>
      {/* <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div> */}
    </div>
  )
}

export default ListOfCalories;