var express = require('express');
var app = express();


var css = []

app.get('*', (req, res, next) => {
    fs.readdir(path.join(__dirname, 'public'), (err, files) => {
        var a = [];
        if (err) {
            throw err
        }
        css = files;
        next();
    })
})

module.exports = css;