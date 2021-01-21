import { SET_USER_PROFILE } from "./constants";

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
                loading: false,
                data: action.payload,
                error: null
            };
        default: return state;
    }

}