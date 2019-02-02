const http = require('http');
const url = require('url');
const querystring = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;
const htmlTemplate = require('./lib/htmlTemplate')
const connection = require('./db/dbconfig')
const sanitizeHTML = require('sanitize-html')
// 보안문제는 sanitize로 eval 방어하고, 
// get방식일경우 url 인젝션은 path로 방어.

const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    if (pathname === "/") {
        var pk = query.pk;

        connection.getConnection(function (err, pool) {
            if (pk) {
                if (err) throw err;
                pool.query(`SELECT * FROM board WHERE pk = ? `, [pk], function (error, result, fields) {
                    var html = htmlTemplate.HTML(
                        `상세페이지`,
                        `
                        <form method="post" action="/process_update">
                            <p><input type="hidden" name="pk" value="${result[0].pk}" ></p>
                            <p><input type="text" name="title" value="${result[0].title}" placeholder="title"></p>
                            <p><input type="text" name="content"  value="${result[0].content}" placeholder="content"></p>
                            <button type="submit">변경</button>
                            <a href="/">뒤로가기</a>
                        </form>
                        <form  method="post" action="/process_delete">
                            <p><input type="hidden" name="pk" value="${result[0].pk}" ></p>
                            <button type="submit">제거</button>
                        </form>
                        `
                    )
                    res.writeHeader(200);
                    res.end(html);
                    pool.release();
                });

            } else {
                if (err) throw err;
                pool.query(`SELECT * FROM board `, function (error, results, fields) {
                    var boardData = "<tbody>"
                    results.forEach(function (data, index) {
                        boardData += `
                        <tr>
                            <td>${index}</td>
                            <td><a href="?pk=${data.pk}">${data.title}</a></td>
                            <td>${data.regDate}</td>
                        </tr>
                        `
                    })
                    boardData += "</tbody>"

                    var html = htmlTemplate.HTML(
                        `제목`,
                        `
                        <table>
                            <caption>
                            게시판
                            </caption>
                            <thead>
                                <tr>
                                    <th>no</th>
                                    <th>title</th>
                                    <th>date</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <tr>
                                ${boardData}
                                </tr>
                            </tbody>
                        </table>
                        <a href="/addBoard">글쓰기</a>
                        `
                    )
                    pool.release();
                    res.writeHeader(200);
                    res.end(html);
                    if (error) throw error;
                });
            }
        });




    } else if (pathname === "/addBoard") {
        var html = htmlTemplate.HTML(
            `추가`,
            `
            <form method="post" action="/process_add">
                <table>
                    <tr>
                        <td>
                           <label for="title">제목</label>
                        </td>
                        <td>
                            <input type="text" id="title" name="title">
                        </td>
                    </tr>
                   
                    <tr>
                        <td>
                            <label for="content">내용</label>
                        </td>
                         <td>
                            <textarea name="content" id="content">
                            </textarea>
                        </td>
                    </tr>
                </table>
                <button type="submit">전송</button>
                <a href="/">뒤로가기</a>
            </form>
            <script>
            document.querySelector('#content').addEventListener('change',function(){ 
                this.value = this.value.trim()
            })

            document.querySelector('button[type=submit]').addEventListener('click',function(e){
                if(document.querySelector('#title').value.trim() === ''){
                    e.preventDefault();
                    alert('값이 비었습니다')
                }
            })
            </script>
            `
        )
        res.writeHeader(200);
        res.end(html);

    } else if (pathname === "/process_add") {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var parseBody = querystring.parse(body);
                var title = sanitizeHTML(parseBody.title);
                var content = sanitizeHTML(parseBody.content);

                connection.getConnection(function (err, pool) {
                    if (err) throw err;
                    pool.query(`INSERT INTO board (title,content,regDate) VALUE (?,?,now()) `, [title, content], function (error, results, fields) {
                        pool.release();
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end()
                        if (error) throw error;
                    });
                });
            });
        }
    } else if (pathname === "/process_update") {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var parseBody = querystring.parse(body);
                var pk = parseBody.pk;
                var title = sanitizeHTML(parseBody.title);
                var content = sanitizeHTML(parseBody.content);
                console.log(parseBody.title)
                console.log(title)
                console.log(content)
                connection.getConnection(function (err, pool) {
                    if (err) throw err;
                    pool.query(`UPDATE board SET title =?,content =? WHERE pk = ? `, [title, content, pk], function (error, results, fields) {
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end()
                        pool.release();
                    });
                });
            });
        }
    } else if (pathname === "/process_delete") {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var parseBody = querystring.parse(body);
                var pk = parseBody.pk;
                connection.getConnection(function (err, pool) {
                    if (err) throw err;
                    pool.query(`delete FROM board  WHERE pk = ? `, [pk], function (error, results, fields) {
                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end()
                        pool.release();
                    });
                });
            });
        }
    } else {
        res.writeHeader(404, { 'Content-Type': 'text/plain;charset=utf8' });
        res.end('찾을수없는페이지');
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});