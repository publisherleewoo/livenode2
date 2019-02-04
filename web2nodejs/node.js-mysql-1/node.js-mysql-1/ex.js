var express = require('express');
var app = express();
var cors = require('cors')
app.use(cors())
app.get('/', function (res, res) {
    var data = { msg: 'hi', test: 'bye' }
    res.json(data)
})

app.listen(3000)