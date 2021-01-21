import {SET_USER_PROFILE} from './constants';

export function setUserProfile (data) {
    return {
        type: SET_USER_PROFILE,
        payload: data
    }
}

