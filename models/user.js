const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리인 salt를 만든다 -> salt를 이용해서 비밀번호 암호화


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

// mongoose에서 가져온 메소드.
// index.js에서 save를 하기 전에 무언가 (function())을 한다 -> 끝나면 save()로 들어감
userSchema.pre('save', function(next){
    let user = this;

    // 비밀번호를 수정할 때에만 암호화를 해야하므로 조건문을 걸어준다.
    // 조건을 안걸면 이름이나 이메일 등 어떠한 수정이 일어나도 암호화가 계속 실행된다.
    if(user.isModified('password')){

        // 비밀번호를 암호화 시킨다.
        // 암호호에 필요한 Salt 생성 (saltRounds: 10자리 salt)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            // 에러가 나는 경우
            if(err) return next(err)
    
            // salt를 제대로 생성한 경우
            // 첫번째 인자: myPlaintextPassword (암호화되기 전 들어온 비밀번호)
            // 세번째 인자의 hash: 암호화된 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash //plain한 비밀번호를 hash된 비밀번호로 교체한다.
                next()
            });
        });

    }


})

const User = mongoose.model('User', userSchema) //('모델의 이름', 스키마)

module.exports = {User}