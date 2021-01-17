const express = require('express') // express 모듈을 가져온다
const app = express() // 새로운 express App 생성
const port = 5000 // port는 아무번호나 상관 없음
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config  = require('./config/key');

const { User } = require("./models/User");


// application/x-www-form-urlencoded 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json으로 된 데이터를 분석해서 가져온다
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
// 에러 방지를 위해 씀.    
useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) // then() - 잘 연결되었을시 나타나도록
.catch(err => console.log(err))// 연결이 잘 안된경우 error를 보여주도록

// root 디렉토리에 hello World가 출력되도록 한다
app.get('/', (req, res) => { 
  res.send('Hello World! ~~ ')
})

// Bcrypt로 암호화하기
// 회원가입을 위한 Register Route 생성
app.post('/register', (req, res) => {

    const user = new User(req.body) 
    // save하기 전에 암호화를 한다.
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})

// 로그인 라우트 생성
// 1) DB에서 요청한 Email 찾기
// 2) DB에서 요청한 Email이 있다면 -> 비밀번호가 같은지 확인
// 3) 비밀번호까지 같다면 Token 생성
app.post('/login', (req, res) => {

    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    // User 모델을 가져와서 findOne 메소드로 찾는다.
    User.findOne({email: req.body.email}, (err, user) => {

            console.log('user', user)
            if (!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다 "
                });
            }
        

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    // comparePassword 메소드는 User모델에서 만든다
    user.comparePassword(req.body.password, (err, isMatch) => {
            // 비밀번호가 다른 경우
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })

            // 비밀번호까지 맞다면 토큰을 생성하기
            // generateToken 메소드를 User 모델에서 생성
            user.generateToken((err, user) => {
                if (err)
                    return res.status(400).send(err);

                // 토큰을 저장한다. 어디에? -> 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    });
                })
            });

        })

})



// 5000번 포트에서 이 앱을 실행하게 됨
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})