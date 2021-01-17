const express = require('express') // express 모듈을 가져온다
const app = express() // 새로운 express App 생성
const port = 5000 // port는 아무번호나 상관 없음
const bodyParser = require("body-parser");

const config  = require('./config/key');

const { User } = require("./models/User");


// application/x-www-form-urlencoded 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json으로 된 데이터를 분석해서 가져온다
app.use(bodyParser.json());


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



// 5000번 포트에서 이 앱을 실행하게 됨
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})