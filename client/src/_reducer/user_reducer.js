import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types';


export default function (state={}, action) {
    // Why switch?? -> 다른 type이 올 때마다 다른 조치를 취해야 하기 때문에!
    switch (action.type) {
        case LOGIN_USER: //action에서 적어준 type
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER: 
            return {...state, register: action.payload}
            break;
        case AUTH_USER: 
            return {...state, userData: action.payload} //왜 userData?-> 200성공시 서버에서 유저에 관련된 데이터들을 보내주기 때문
            break;

        default:
            return state;
    }
}
