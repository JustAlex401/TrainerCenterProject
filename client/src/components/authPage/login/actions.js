import {SET_USER_PROFILE, LOGOUT_PROFILE} from './constants';

export function setUserProfile (data) {
    return {
        type: SET_USER_PROFILE,
        payload: data
    }
}

export function logoutProfile () {
    return {
        type: LOGOUT_PROFILE,
    }
}


