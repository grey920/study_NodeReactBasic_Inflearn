const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리인 salt를 만든다 -> salt를 이용해서 비밀번호 암호화
const jwt = require('jsonwebtoken');

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

    } else { // 비밀번호를 수정하는게 아닌 경우 빠져나와서 user.save()를 진행한다.
        next()
    }


})

 userSchema.methods.comparePassword = function(plainPassword, callback){

    // plainPassword 1234567    암호화된 비밀번호 $2b$10$HQz.irPzTfJfMTfA2vVXWeoiJ7mcJvVGLhZ98q53NdyjnPe62lrQe
    // 복호화를 할 수 없기 때문에 plainPassword를 암호화해서 같은지 비교해야 한다.
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        // 비밀번호가 다르다면 error 주기
        if(err) return callback(err);
        // 비밀번호가 같다면 콜백을 주는데 에러는 없고, isMatch(true값) 비밀번호는 같다 => index.js의 user.comparePassword()로 간다 
        callback(null, isMatch);
    })
 }


 userSchema.methods.generateToken = function(callback){
     let user = this;

    // jsonwebtoken을 이용해서 token을 생성
    // user._id는 mongoDB의 collection에서 확인할 수 있는 _id
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // 따라서 token이 있고 secretToken을 알면 user._id를 알아낼 수 있다.

    user.token = token //userSchema의 필드에 있는 token에 넣어준다.
    user.save(function(err, user){
        if(err) return callback(err)
        // save가 잘 되었다면 err는 없고 user 정보를 넘겨준다
        callback(null, user)
    })
 }

 userSchema.statics.findByToken = function (token, callback) {
    let user = this;

    // user._id + '' = token
    // 토큰을 decode 한다
    // decoded: 유저아이디
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return callback(err);
            callback(null, user);
        })
    })
 }

const User = mongoose.model('User', userSchema) //('모델의 이름', 스키마)

module.exports = {User}