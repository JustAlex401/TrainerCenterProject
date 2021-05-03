import axios from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import { SET_USER_PROFILE, SET_USER_PROFILE_FAILURE, SET_USER_PROFILE_FOR_TRAINING, SET_USER_PROFILE_FOR_TRAINING_FAILURE, SET_USER_PROFILE_FOR_TRAINING_SUCCESS, SET_USER_PROFILE_SUCCESS } from './constants';

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

export default function* () {
  yield takeEvery(SET_USER_PROFILE_FOR_TRAINING, setUserProfileForTraining);
}
