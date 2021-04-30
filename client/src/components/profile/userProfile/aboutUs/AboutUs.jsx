import React, { useState } from 'react';
import label from '../../../../utils/images/label.jpg';

const AboutUs = () => {

    return ( 
      <div className='container center' style={{maxWidth: '500px'}}>
        <img src={label} alt='000' style={{height: '300px'}}></img>
        <p style={{fontSize: '28px', color: 'white', fontFamily: 'Bookman, URW Bookman L, serif'}}>An individual training and nutrition program is available for proper and harmonious exercise and lifestyle. Fitness club is the science of inner harmony, without which there will be no external results.</p>
      </div>
    )
}

export default AboutUs;