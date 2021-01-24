import axios from 'axios'
import {LOGIN_USER} from './types'

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