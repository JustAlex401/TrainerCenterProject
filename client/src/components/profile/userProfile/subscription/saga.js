import axios from 'axios';
import {put, takeEvery, call, select} from 'redux-saga/effects';
import { GET_PAYMENTS, GET_PAYMENTS_FAILURE, GET_PAYMENTS_SUCCESS } from './constants';

export function* getPaymentsForUser() {
  try {
    const id = yield select(state => state.user.data.userId);
    const response = yield call(axios.get, `/api/user/payments/${id}`);
    yield put({
      type: GET_PAYMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_PAYMENTS_FAILURE
    });
  }
}


export default function* () {
  yield takeEvery(GET_PAYMENTS, getPaymentsForUser);
}
