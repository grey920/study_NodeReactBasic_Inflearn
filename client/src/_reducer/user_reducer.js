import {LOGIN_USER, REGISTER_USER} from '../_actions/types';


export default function (state={}, action) {
    // Why switch?? -> 다른 type이 올 때마다 다른 조치를 취해야 하기 때문에!
    switch (action.type) {
        case LOGIN_USER: //action에서 적어준 type
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER: 
            return {...state, register: action.payload}
            break;

        default:
            return state;
    }
}
