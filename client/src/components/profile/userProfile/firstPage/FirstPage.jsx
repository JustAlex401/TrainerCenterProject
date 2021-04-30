import React, { useState } from 'react';
import './firstPage.css';
import firstGymIcon from '../../../../utils/images/gym1.jpg';
import secondGymIcon from '../../../../utils/images/gym2.jpg';
import thirdGymIcon from '../../../../utils/images/gym3.jpg';
import fourthGymIcon from '../../../../utils/images/gym4.jpg';
import cashIcon from '../../../../utils/images/cash.png';
import qualityIcon from '../../../../utils/images/quality.png';
import locationIcon from '../../../../utils/images/location.png';

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
              <img src={thirdGymIcon} className='gymIcons'/>
              <img src={fourthGymIcon} className='gymIcons'/>
            </div>
            <div className='container col additionalStyle'>
              <div className='row'>
                <p style={{color:'white', fontSize: '40px', marginTop: '100px'}} >Our gym give you</p>
              </div>
              <div className='row'>
                <img src={cashIcon} className='additionalIcon'/>
                <img src={qualityIcon} className='additionalIcon'/>
                <img src={locationIcon} className='additionalIcon'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FirstPage;