import axios from 'axios';
import {call, put, takeEvery} from '@redux-saga/core/effects'
import { GET_TRAINER_LIST, GET_TRAINER_LIST_FAILURE, GET_TRAINER_LIST_SUCCESS } from './constants';


export function* getTrainerList(action){
    try{
        const response = yield call(axios.get, 'api/trainer/trainerList');
        yield put(
            {
                type: GET_TRAINER_LIST_SUCCESS,
                payload: response.data
            }   
        );
    } catch (e){
        yield put(
            {
                type: GET_TRAINER_LIST_FAILURE,
                payload: e.message
            }   
        );
    }
}

export default function* (){
    yield takeEvery(GET_TRAINER_LIST, getTrainerList);
}