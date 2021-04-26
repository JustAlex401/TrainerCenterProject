import {SET_USER_PROFILE, LOGOUT_PROFILE, SET_USER_PROFILE_REDUX_FOR_REDIRECT} from './constants';

export function setUserProfile (data) {
    return {
        type: SET_USER_PROFILE,
        payload: data
    }
}

// export function logoutProfile () {
//     return {
//         type: LOGOUT_PROFILE,
//     }
// }

export function setUserProfileRedux (data) {
    console.log(typeof data.userId)
    return {
        type: SET_USER_PROFILE_REDUX_FOR_REDIRECT,
        payload: data
    }
}


