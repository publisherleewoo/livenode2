var express = require('express');
var app = express();
var pool = require('./db/db_config');
var bodyParser = require('body-parser');
var css = require('./middleware/css')

app.use(bodyParser.urlencoded({ extended: false }))

var path = require('path');
app.set('view engine', 'ejs');

var port = 3000;
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    pool.query('SELECT * FROM page', function (error, results, fields) {
        if (error) throw error;
        res.render('index', { title: "main", css: css, lists: results })
    });
})

app.get('/page/:id', (req, res) => {
    pool.query('SELECT * FROM page', function (error, results, fields) {
        pool.query(`SELECT * FROM page WHERE pk=${req.params.id}`, function (error, result, fields) {
            if (error) throw error;
            var result = result[0]
            res.render('detail', { title: result.title, css: css, lists: results, target: result })
        });
    })
})

app.get('/create', (req, res) => {
    res.render('create', { title: 'create', css: css })
})

app.post('/create_process', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    pool.query('INSERT INTO page (title,description) VALUE (?,?)', [title, description], function (error, result, fields) {
        if (error) throw error;
        res.status(302).redirect(`/page/${result.insertId}`)
    })
})


/* update delete 남음 */


app.listen(port, function (req, res) {
    console.log(`http://localhost:${port}`)
})