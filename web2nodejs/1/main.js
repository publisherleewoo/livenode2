var http = require('http');
var fs = require('fs');
const url = require('url');
var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    function templateHTML(title, list, body) {
        return `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                   ${body}
                </body>
                </html>
                `;
    }

    function templateList(filelist) {
        var list = "<ul>";
        filelist.forEach(function (file, index) {
            list += `<li><a href="/?id=${file}">${file}</a></li>`
        })
        list += "</ul>";
        return list
    }

    if (pathname === '/') {
        if (queryData.id === undefined) {
            var title = 'welcome';
            var description = 'Hello, Node.js';

            fs.readdir('./data', function (err, filelist) {
                var list = templateList(filelist);
                var template = templateHTML(title, list, ` <h2>${title}</h2><p>${description}</p>`)
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.end(template);
            })
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                fs.readdir('./data', function (err, filelist) {
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`)
                    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    response.end(template);
                })
            })
        }
    } else {
        response.writeHead(400, { 'Content-Type': 'text/html;charset=utf-8' });
        response.end('에러')
    }




});
app.listen(3000, function () {
    console.log('http://localhost:3000')
});