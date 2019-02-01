const http = require('http');
const url = require('url');
const fs = require('fs');

const templateHTML = require('./htmlconfig/templateHTML')


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    var _url = req.url;
    var queryData = url.parse(_url, true).query
    var pathname = url.parse(_url, true).pathname
    var queryId = queryData.id;


    if (pathname === "/") {
        var title = `메인`
        if (queryId) {
            fs.readFile(`data/${queryId}`, 'utf8', function (err, file) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(file);
            })
        } else {
            fs.readdir('data', 'utf8', function (err, fileList) {
                if (fileList === undefined) {
                    var body = `
                <h1>${title}</h1>
                게시글이 없습니다
                <a href="/add">입력하러 가기</a>
            `
                    var template = templateHTML(title, body)
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=uft8' });
                    res.end(template);
                } else {

                    var boardList = ""
                    fileList.forEach(function (file, index) {
                        boardList += `<tr><td><a href="?id=${file}">${file}</a></td></tr>`
                    })

                    var body = `
                    <h1>${title}</h1>
                    <table>
                        <caption>게시판</caption>
                        <thead>
                        <tr>
                            <th>제목</th>
                        </tr>
                        </thead>
                        <tbody>
                            ${boardList}
                        </tbody>
                    </table>
                    <a href="/add">입력하러 가기</a>
                `
                    var template = templateHTML(title, body)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(body);
                }
            });
        }
    } else if (pathname === "/add") {
        var title = "입력하기"
        var body = `
            <h1>${title}</h1>
            <form method="get" action="/addApi">
            <p><label for="title">제목</label><input id="title" type="text" name="title" placeholder="제목"></p>
            <p>
            <label for="content">내용</label>
            <textarea id="contnet" name="content">
            
            </textarea>
            </p>
            <button type="submit">입력</button>
            <a href="/">뒤로가기</a>
            </form>
        `
        var template = templateHTML(title, body)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(template);
    }




    if (pathname === "/addApi") {
        var title = queryData.title.trim();
        var content = queryData.content.trim();

        fs.writeFile(`data/${title}`, content, (err) => {
            if (err) {
                console.log('write file 에러')
                throw err
            }
            console.log('The file has been saved!');
            res.writeHead(302, { 'Location': '/' });
            res.end();
        });
    }












});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});