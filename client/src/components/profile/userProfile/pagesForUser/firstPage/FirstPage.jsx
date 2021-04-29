import React, { useState } from 'react';
import './firstPage.css';
import firstGymIcon from '../../../../../utils/images/gym1.jpg';
import secondGymIcon from '../../../../../utils/images/gym2.jpg';
import ThirdGymIcon from '../../../../../utils/images/gym3.jpg';
import fourthGymIcon from '../../../../../utils/images/gym4.jpg';

const FirstPage = () => {

    return ( 
      <div className="col center" style={{width: '100%'}}>
        <div className='col center' style={{ overflow: 'auto', height: '700px', margin: '0 !important'}}>
          <div className='col container center divTitleStyle'>
            <p className="firstUserPageTitle" style={{marginLeft: '-150px'}}>FITNESS</p>
            <p className="firstUserPageTitle" style={{marginLeft: '+150px'}}>OLYMP</p>
          </div>
          <div className='col center' style={{marginBottom: '100px'}}>
            <div className="row" style={{width: '100%'}}>
              <img src={firstGymIcon} className='gymIcons'/>  
              <img src={secondGymIcon} className='gymIcons'/>
            </div>
            <div className="row">
              <img src={ThirdGymIcon} className='gymIcons'/>
              <img src={fourthGymIcon} className='gymIcons'/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FirstPage;