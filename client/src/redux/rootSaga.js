import { all } from 'redux-saga/effects';
import TrainerList from '../components/trainerList/saga';
import UserData from '../components/authPage/login/saga';
import Profile from '../components/profile/userProfile/saga';
import Exercises from '../components/profile/userProfile/trainingProgramm/saga';
import Payments from '../components/profile/userProfile/subscription/saga';

const Sagas = function*(){
  yield all([
    TrainerList(),
    UserData(),
    Profile(),
    Exercises(),
    Payments()
  ]);
}

export default Sagas;