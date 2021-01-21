import { all } from 'redux-saga/effects';
import TrainerList from '../components/trainerList/saga';

const Sagas = function*(){
  yield all([
    TrainerList(),
  ]);
}

export default Sagas;