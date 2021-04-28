import React from 'react';

const TrainerList = ({trainer, key, index}) => {

    return (
        <div className='trainerList'>
            <div className="container">
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="card" style={{borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.7)'}}>
                            <div className="card-image">
                                <img src={trainer.photo} alt='oy'></img>
                            </div> 
                            <div className="card-content">
                                <span className="card-title">{trainer.name}</span>
                                <ul>
                                    <li>age: {trainer.age}</li>
                                    <li>weight: {trainer.weight}</li>
                                    <li>height: {trainer.height}</li>
                                </ul>
                                <p>{trainer.character}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
}

export default TrainerList;

