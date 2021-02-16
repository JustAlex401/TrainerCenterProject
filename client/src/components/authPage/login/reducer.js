import { SET_USER_PROFILE, SET_USER_PROFILE_FAILURE, SET_USER_PROFILE_SUCCESS } from "./constants";

const initialState = {
    loading: false,
    data: {},
    error: null
}

export function userReducer (state=initialState, action) {

    switch(action.type){
        case SET_USER_PROFILE:
            return{
                ...state,
                loading:true
            };
        case SET_USER_PROFILE_SUCCESS:
            return{
                ...state,
                loading: false, 
                error: null,
                data: action.payload
            };
        case SET_USER_PROFILE_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            };
        default: return state;
    }

}