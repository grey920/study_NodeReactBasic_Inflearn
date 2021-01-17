// 1) 몽구스 모듈을 가져온다
const mongoose = require('mongoose');

// 2) 몽구스를 이용하여 스키마 생성
const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //공백을 없애주는 역할
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role: { // 관리자와 일반 유저를 구분
        type: Number, // 1은 관리자, 0은 일반유저
        default: 0
    },
    image: String,
    token:{ // 유효성 관리
        type: String
    },
    tokenExp:{ // 토큰 유효기간
        type: Number
    }
})

// 3) 스키마를 모델로 감싸준다.
const User = mongoose.model('User', userSchema) //('모델의 이름', 스키마)

// 4) 이 모델을 다른 곳에서도 쓰도록 export
module.exports = {User}