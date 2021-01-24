import axios from 'axios'
import { response } from 'express';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
    const dispatch = useDispatch();

    const[Email, setEmail] = useState("")
    const[Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        //여기서 해야할 일들이 이루어지지 않고 리프레시 되기 때문에 이벤트를 막아둔다.
        event.preventDefault();

        console.log(`Email: ${Email}`)
        console.log(`Password: ${Password}`)

        let body = {
            email: Email,
            password: Password
        }

        // Action : loginUser()
        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                // 리액트에서 페이지를 이동시킬때 props.history.push()를 이용.
                props.history.push('/')
            } else {
                alert('Error')
            }
        })

    }

    return (
        <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100vh'
        }}>
            <form style={{
                display:"flex",
                flexDirection:"column"
            }}
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
