import { SET_USER_PROFILE_FOR_TRAINING, SET_USER_PROFILE_FOR_TRAINING_FAILURE, SET_USER_PROFILE_FOR_TRAINING_SUCCESS } from "./constants";

const initialState = {
    loading: false,
    data: {},
    error: null
}

export function profileReducer (state=initialState, action) {

    switch(action.type){
        case SET_USER_PROFILE_FOR_TRAINING:
            return{
                ...state,
                loading:true
            };
        case SET_USER_PROFILE_FOR_TRAINING_SUCCESS:
            return{
                ...state,
                loading: false, 
                error: null,
                data: action.payload
            };
        case SET_USER_PROFILE_FOR_TRAINING_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            };
        default: return state;
    }

}