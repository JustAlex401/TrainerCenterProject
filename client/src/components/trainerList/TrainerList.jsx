import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { getTrainerList } from './actions';

const TrainerList = () => {

    const {loading, request, error, clearError} = useHttp();
    const dispatch = useDispatch();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            console.log("AAA");
            dispatch(getTrainerList());
        } catch (err) {
                console.log(err);
        }
       
    }

    return (
        <div>
                 <p>AAAA</p>
        </div>
      
    );
}

export default TrainerList;

