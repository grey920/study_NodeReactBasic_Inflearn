import axios from 'axios'
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from './types'

export function loginUser(dataToSubmit){

    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data ) // 서버에서 받은 데이터를 request에 저장한다

    // request를 리턴해서 Reducer로 보낸다 (이전state와 action을 합해서 다음 state를 만들어냄)
    // user_reducer로 간다
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataToSubmit){

    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data ) // 서버에서 받은 데이터를 request에 저장한다

    // request를 리턴해서 Reducer로 보낸다 (이전state와 action을 합해서 다음 state를 만들어냄)
    // user_reducer로 간다
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){//get메소드라 바디는 필요 없음

    const request = axios.get('/api/users/auth')
    .then(response => response.data ) // 서버에서 받은 데이터를 request에 저장한다

    // request를 리턴해서 Reducer로 보낸다 (이전state와 action을 합해서 다음 state를 만들어냄)
    // user_reducer로 간다
    return {
        type: AUTH_USER,
        payload: request
    }
}