import { combineReducers } from "redux";
import { userReducer } from "../components/authPage/login/reducer";

export const rootReducer = combineReducers({
    user: userReducer
})