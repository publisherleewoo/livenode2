var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var template = require('./lib/fileTemplate');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            var title = 'welcome';
            var description = 'Hello, Node.js';
            fs.readdir('./data', function (err, filelist) {
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    ` <h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>`
                )
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.end(html);
            })
        } else {
            var filterd = path.parse(queryData.id).base;

            fs.readFile(`data/${filterd}`, 'utf8', function (err, description) {
                var title = queryData.id;
                fs.readdir('./data', function (err, filelist) {
                    var list = template.list(filelist);
                    var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`,
                        `
                        <a href="/create">create</a>
                        <a href="/update?id=${title}">update</a>
                        <form method="post" action="/delete_process"  >
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>
                        `
                    )
                    response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    response.end(html);
                })
            })
        }
    } else if (pathname === "/create") {
        var title = 'WEB - create';
        fs.readdir('./data', function (err, filelist) {
            var list = template.list(filelist);
            var html = template.HTML(title, list, `
            <form method="post" action="/create_process">
                <p>
                    <input type="text" name="title" placeholder="title">
                </p>
                <p>
                    <textarea name="description" placeholder="description">
                    </textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `, '')
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            response.end(html);
        })
    } else if (pathname === "/create_process") {
        var body = "";
        request.on('data', function (data) {
            body += data
        })
        request.on('end', function () {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            var filterd = path.parse(title).base;
            fs.writeFile(`data/${filterd}`, `${description}`, 'utf8', function (err) {
                console.log(err)
                response.writeHead(302, {
                    'Location': `/?id=${filterd}`
                });
                response.end();
            })
        })
    } else if (pathname === "/update") {
        var filterd = path.parse(queryData.id).base;
        fs.readFile(`data/${filterd}`, 'utf8', function (err, description) {
            fs.readdir('./data', function (err, filelist) {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.HTML(title, list,
                    `
                    <form method="post" action="/update_process">
                     <input type="hidden" name="id" value="${title}">
                        <p>
                            <input type="text" name="title" placeholder="title" value=${title}>
                        </p>
                        <p>
                            <textarea name="description" placeholder="description">${description}
                            </textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                     `,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                )
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.end(html);
            })
        })
    } else if (pathname === "/update_process") {
        var body = "";
        request.on('data', function (data) {
            body += data
        })
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            var filterd = path.parse(id).base;
            fs.rename(`data/${filterd}`, `data/${title}`, function (err) {
                fs.writeFile(`data/${title}`, `${description}`, 'utf8', function (err) {
                    console.log(err)
                    response.writeHead(302, {
                        'Location': `/?id=${title}`
                    });
                    response.end();
                })
            });

        })
    } else if (pathname === "/delete_process") {
        var body = "";
        request.on('data', function (data) {
            body += data
        })
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var filterd = path.parse(id).base;
            fs.unlink(`data/${filterd}`, function (err) {
                response.writeHead(302, {
                    'Location': `/`
                });
                response.end('제거');
            });

        })
    } else {
        response.writeHead(400, { 'Content-Type': 'text/html;charset=utf-8' });
        response.end('에러')
    }




});
app.listen(3000, function () {
    console.log('http://localhost:3000')
});