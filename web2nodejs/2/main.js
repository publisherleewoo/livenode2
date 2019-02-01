var http = require('http');
var fs = require('fs');
const url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control) {
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
                    ${control}
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


var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            var title = 'welcome';
            var description = 'Hello, Node.js';
            fs.readdir('./data', function (err, filelist) {
                var list = templateList(filelist);
                var template = templateHTML(title, list,
                    ` <h2>${title}</h2><p>${description}</p>`,
                    `<a href="/create">create</a>`
                )
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.end(template);
            })
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                fs.readdir('./data', function (err, filelist) {
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`,
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
                    response.end(template);
                })
            })
        }
    } else if (pathname === "/create") {
        var title = 'WEB - create';
        fs.readdir('./data', function (err, filelist) {
            var list = templateList(filelist);
            var template = templateHTML(title, list, `
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
            response.end(template);
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
            fs.writeFile(`data/${title}`, `${description}`, 'utf8', function (err) {
                console.log(err)
                response.writeHead(302, {
                    'Location': `/?id=${title}`
                });
                response.end();
            })
        })
    } else if (pathname === "/update") {
        fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
            fs.readdir('./data', function (err, filelist) {
                var title = queryData.id;
                var list = templateList(filelist);
                var template = templateHTML(title, list,
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
                response.end(template);
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

            fs.rename(`data/${id}`, `data/${title}`, function (err) {
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
            fs.unlink(`data/${id}`, function (err) {
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