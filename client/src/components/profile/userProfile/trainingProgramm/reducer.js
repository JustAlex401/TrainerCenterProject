import { GET_EXERCISES_AND_TRAINERS, GET_EXERCISES_AND_TRAINERS_FAILURE, GET_EXERCISES_AND_TRAINERS_SUCCESS
  } from "./constants";

const initialState = {
    loading: false,
    data: {},
    error: null
}

export function exercisesReducer (state=initialState, action) {

    switch(action.type){
        case GET_EXERCISES_AND_TRAINERS:
            return{
                ...state,
                loading:true
            };
        case GET_EXERCISES_AND_TRAINERS_SUCCESS:
            return{
                ...state,
                loading: false, 
                error: null,
                data: action.payload
            };
        case GET_EXERCISES_AND_TRAINERS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        default: return state;
    }

}