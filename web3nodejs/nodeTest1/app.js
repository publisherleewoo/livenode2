var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser())
var bodyParser = require('body-parser');
var path = require('path')
var routerBoard = require('./routes/board')
var routerLogin = require('./routes/login')


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
var port = 3000;

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', routerBoard)
app.use('/login', routerLogin)


app.listen(port, function (req, res) {
    console.log(`http://localhost:${port}`)
})