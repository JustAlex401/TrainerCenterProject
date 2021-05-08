import axios from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import { GET_EXERCISES_AND_TRAINERS, GET_EXERCISES_AND_TRAINERS_FAILURE, GET_EXERCISES_AND_TRAINERS_SUCCESS } from './constants';

export function* getExercisesAndTrainers(action) {
  try {
    const id = yield select(state => state.user.data.userId);
    const response = yield call(axios.post, `/api/user/exercises-and-trainers/${id}`, action.payload);
    yield put({
      type: GET_EXERCISES_AND_TRAINERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_EXERCISES_AND_TRAINERS_FAILURE
    });
  }
}


export default function* () {
  yield takeEvery(GET_EXERCISES_AND_TRAINERS, getExercisesAndTrainers);
}
