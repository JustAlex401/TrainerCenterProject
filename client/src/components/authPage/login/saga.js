// import API from '../../utils/apiWrapper';
import axios from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import { SET_USER_PROFILE, SET_USER_PROFILE_FAILURE, SET_USER_PROFILE_SUCCESS } from './constants';

export function* setUserProfile(action) {
  try {
    const response = yield call(axios.post, '/api/auth/login', action.payload);
    yield put({
      type: SET_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: SET_USER_PROFILE_FAILURE,
      payload: e.message,
    });
  }
}

export default function* () {
  yield takeEvery(SET_USER_PROFILE, setUserProfile);
}
