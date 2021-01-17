const express = require('express') // express 모듈을 가져온다
const app = express() // 새로운 express App 생성
const port = 5000 // port는 아무번호나 상관 없음
const bodyParser = require("body-parser");
const { User } = require("./models/User");


// application/x-www-form-urlencoded 데이터를 분석해서 가져온다.
app.use(bodyParser.urlencoded({extended: true}));

// application/json으로 된 데이터를 분석해서 가져온다
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://grey:asdf1234@boilerplate.ld0vd.mongodb.net/<dbname>?retryWrites=true&w=majority', {
// 에러 방지를 위해 씀.    
useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...')) // then() - 잘 연결되었을시 나타나도록
.catch(err => console.log(err))// 연결이 잘 안된경우 error를 보여주도록

// root 디렉토리에 hello World가 출력되도록 한다
app.get('/', (req, res) => { 
  res.send('Hello World! ~~ ')
})


// 회원가입을 위한 Register Route 생성
app.post('/register', (req, res) => {

    // 회원가입할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
    // user모델을 가져온다. 
    // user 인스턴스 생성
    const user = new User(req.body) // bodyParser를 통해 Client로부터 온 정보를 req.body에 담아온다

    // req.body로 온 정보들이 user 모델에 저장됨
    user.save((err, userInfo) => {
        // 저장할 떄 에러가 있으면 클라이언트에 에러메시지와 함께 알려준다
        if(err) return res.json({success: false, err})
        // 성공하면 json 형식으로 성공했음을 알려준다
        return res.status(200).json({
            success: true
        })
    })

})



// 5000번 포트에서 이 앱을 실행하게 됨
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})