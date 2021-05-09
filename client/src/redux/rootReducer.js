import { combineReducers } from "redux";
import { userReducer } from "../components/authPage/login/reducer";
import { trainerReducer } from "../components/trainerList/reducer";
import { profileReducer } from '../components/profile/userProfile/reducer';
import { exercisesReducer } from '../components/profile/userProfile/trainingProgramm/reducer';
import { paymentsReducer } from "../components/profile/userProfile/subscription/reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    trainerList: trainerReducer,
    profile: profileReducer,
    exercises: exercisesReducer,
    payments: paymentsReducer
})