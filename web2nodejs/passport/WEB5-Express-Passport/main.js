var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());
var session = require('express-session')
var FileStore = require('session-file-store')(session)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))


/* 세션에 추가하는 1회용 플래시기능 */
var flash = require('connect-flash');

app.use(flash());

app.get('/flash', function (req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('msg', 'Flash is back!!')
    res.send('flash')
});

app.get('/flash-display', function (req, res) {
    // Get an array of flash messages by passing the key to req.flash() 한번사용됌
    var fmsg = req.flash();
    console.log(fmsg)
    res.send(fmsg)
});



var authData = {
    email: 'egoing777@gmail.com',
    password: '111111',
    nickname: 'egoing'
}

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {  //3.로그인에 성공했을때 딱1번 호출
    console.log('serializeUser', user)
    done(null, user.email); //done 실행시 두번째파라미터가 세션 스토어에 값 들어감
});

passport.deserializeUser(function (id, done) { //4.페이지에 방문할때마다 호출됌 세션에 값 조회해서 가져옴  
    console.log('deserializeUser', id)
    done(null, authData);  //사용자의 데이터를 넣어줌
});

passport.use(new LocalStrategy({  //2.로그인 성공여부 코드
    usernameField: 'email',
    passwordField: 'pwd'
}, function (username, password, done) {
    console.log('LocalStrategy', username, password)
    if (username !== authData.email) {
        console.log('1')
        return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== authData.password) {
        console.log('2')
        return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('3')
    return done(null, authData);  //serializeUser 콜백함수가 호출되는데, 두번째파라미터가 user로 들어감
}
));

app.post('/auth/login_process',  //1.
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login'
    })
);

app.get('*', function (request, response, next) {
    fs.readdir('./data', function (error, filelist) {
        request.list = filelist;
        next();
    });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
