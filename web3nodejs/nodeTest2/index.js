const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session')


/* setting */
app.use(session({
    secret: 'dsjaoidjoi#@!@!#(JQWO*@!)',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use(express.static('public'));
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


/* routes */
var login = require('./routes/login');
app.use('/login', login);

var board = require('./routes/board');
app.use('/board', board);


app.get('/', function (req, res) {
    res.redirect('/login')
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})