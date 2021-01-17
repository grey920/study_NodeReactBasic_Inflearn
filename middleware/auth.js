const { User } = require("../models/User");

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후 유저를 찾는다
    // User모델에서 메소드 만들기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        // 유저가 없을떄 클라이언트에게 전해주는 메시지
        if(!user) return res.json({isAuth: false, error: true})

        // 유저가 있다면 index.js에서 토큰과 유저 정보를 사용할 수 있도록 req에 넣어준다
        req.token = token; // 토큰을 넣어주고
        req.user = user; // 유저 정보를 넣어줌
        next(); // 미들웨어에서 다음으로 갈 수 있게! (안하면 미들웨어에 멈춰있다.)
    })

    // 유저가 있으면 인증 OK

    // 유저가 없으면 인증 No


}

module.exports = {auth};