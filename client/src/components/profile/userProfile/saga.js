import axios from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import { SET_USER_PROFILE_FOR_TRAINING, SET_USER_PROFILE_FOR_TRAINING_FAILURE, SET_USER_PROFILE_FOR_TRAINING_SUCCESS, GET_USER_PROFILE_FOR_TRAINING, GET_USER_PROFILE_FOR_TRAINING_SUCCESS, GET_USER_PROFILE_FOR_TRAINING_FAILURE } from './constants';

export function* setUserProfileForTraining(action) {
  try {
    const id = yield select(state => state.user.data.userId);
    const response = yield call(axios.post, `/api/user/calories/${id}`, action.payload);
    yield put({
      type: SET_USER_PROFILE_FOR_TRAINING_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: SET_USER_PROFILE_FOR_TRAINING_FAILURE
    });
  }
}

export function* getUserProfileForTraining() {
  try {
    const id = yield select(state => state.user.data.userId);
    const response = yield call(axios.get, `/api/user/profile/${id}`);
    yield put({
      type: GET_USER_PROFILE_FOR_TRAINING_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_USER_PROFILE_FOR_TRAINING_FAILURE
    });
  }
}

export default function* () {
  yield takeEvery(SET_USER_PROFILE_FOR_TRAINING, setUserProfileForTraining);
  yield takeEvery(GET_USER_PROFILE_FOR_TRAINING, getUserProfileForTraining);
}
