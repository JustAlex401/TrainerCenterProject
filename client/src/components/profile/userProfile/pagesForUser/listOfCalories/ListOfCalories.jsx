import React, { useState } from 'react';
import './ListOfCalories.css';

const ListOfCalories = () => {

    return ( 
      <div className='col rootListCalories s12'>
        <div class="row">
          <div class="input-field col s8 offset-s2">
            <i className="material-icons prefix inp">search</i>
            <input placeholder="search" id="icon_prefix" type="text" class="validate"></input>
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