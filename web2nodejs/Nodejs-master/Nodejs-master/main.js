const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const topicRouter = require('./routes/topic');
const indexRouter = require('./routes/index');
const fs = require('fs');
var helmet = require('helmet');
const port = 3000


app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.get('*', function (request, response, next) {
    fs.readdir('./data', function (error, filelist) {
        request.list = filelist;
        next();
    })
})


app.use('/', indexRouter);
app.use('/topic', topicRouter);



app.use(function (req, res, next) {
    res.status(404).send('없는페이지')
})
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('에러페이지')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
