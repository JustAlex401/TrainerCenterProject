import { combineReducers } from "redux";
import { userReducer } from "../components/authPage/login/reducer";
import { trainerReducer } from "../components/trainerList/reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    trainerList: trainerReducer
})