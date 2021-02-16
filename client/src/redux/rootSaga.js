import { all } from 'redux-saga/effects';
import TrainerList from '../components/trainerList/saga';
import Profile from '../components/authPage/login/saga';

const Sagas = function*(){
  yield all([
    TrainerList(),
    Profile(),
  ]);
}

export default Sagas;