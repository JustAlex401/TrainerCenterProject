import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHttp } from '../../hooks/http.hook';
import { getTrainerList } from './actions';
// import classnames from 'classnames';

const TrainerList = ({trainer, key, index}) => {

    return (
        <div class='root'>
            <div class="container">
                <div class="row">
                    <div class="col s6 offset-s3">
                        <div class="card">
                            <div class="card-image">
                                <img src='' alt='oy'></img>
                            </div> 
                            <div class="card-content">
                                <span class="card-title">{trainer.name}</span>
                                <ul>
                                    <li>age: {trainer.age}</li>
                                    <li>weight: {trainer.weight}</li>
                                </ul>
                                <p>{trainer.character}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
}

export default TrainerList;

