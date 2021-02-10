import { GET_TRAINER_LIST, GET_TRAINER_LIST_FAILURE, GET_TRAINER_LIST_SUCCESS } from "./constants";

const initialState = {
    loading: false,
    data: [],
    error: null
}

export function trainerReducer(state=initialState, action) {
    switch(action.type){
        case GET_TRAINER_LIST:
            return{
                ...state,
                loading:true
            };
        case GET_TRAINER_LIST_SUCCESS: 
            return{
                ...state,
                loading: false, 
                error: null,
                data: action.payload
            };
        case GET_TRAINER_LIST_FAILURE: 
            return{
                ...state,
                loading: false, 
                error: action.payload,
            };
        default: return state;
    }

}