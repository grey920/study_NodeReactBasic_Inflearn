import React, { useEffect } from 'react'
import axios from 'axios';


function LandingPage() {

    // LandingPage에 들어오자마자 여기 useEffect를 실행한다.
    // 
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, []);


    return (
        <div>
            Landing Page 랜딩 페이지
        </div>
    )
}

export default LandingPage
