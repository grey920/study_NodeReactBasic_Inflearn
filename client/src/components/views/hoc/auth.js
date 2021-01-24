import axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../../../_actions/user_action';


// option
// 1. null  => 아무나 출입이 가능한 페이지
// 2. true  => 로그인한 유저만 출입이 가능한 페이지
// 3. false  => 로그인한 유저는 출입이 불가능한 페이지

// adminRoute = null
// 세번째 인자가 없으면 기본값 null
// true를 넣어준다면 관리자만 가능한 페이지 
export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {
        // 1. backend에 request날려서 현재 상태를 확인
        const dispatch = useDispatch();
        
        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    // 1. admin이 아닌 사람이 admin만 들어가는 페이지를 시도할 때 
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        // 2. 로그인한 유저가 들어갈 수 없는 페이지 (로그인, 회원가입)를 시도할 떄
                        if(option === false) {
                            props.history.push('/')
                        }
                    }
                }




            });
            
        }, [])

        return (
            <SpecificComponent />
        )
    }




    return AuthenticationCheck
}