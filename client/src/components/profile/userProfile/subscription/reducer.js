import { GET_PAYMENTS, GET_PAYMENTS_FAILURE, GET_PAYMENTS_SUCCESS
  } from "./constants";

const initialState = {
    loading: false,
    data: {},
    error: null
}

export function paymentsReducer (state=initialState, action) {

    switch(action.type){
        case GET_PAYMENTS:
            return{
                ...state,
                loading:true
            };
        case GET_PAYMENTS_SUCCESS:
            return{
                ...state,
                loading: false, 
                error: null,
                data: action.payload
            };
        case GET_PAYMENTS_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        default: return state;
    }

}