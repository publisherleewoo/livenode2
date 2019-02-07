var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error, authors) {
            var title = 'author';
            var list = template.list(topics);
            var authorTr = template.authorList(authors)
            var html = template.HTML(title, list,
                `
                ${template.authorTable(authorTr)}
                <form method="post" action="/author/create_process">
                    <p><input type="text" placeholder="name" name="name"></p>
                    <p><input type="text" placeholder="profile" name="profile"></p>
                    <p><input type="submit" value="create"></p>
                </form>
            `, ''
            );
            response.writeHead(200);
            response.end(html);
        })
    });
}

exports.create_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data
    })
    request.on('end', function (data) {
        var post = qs.parse(body);
        var name = post.name;
        var profile = post.profile;
        console.log(post)
        db.query(`INSERT INTO author (name, profile) VALUES (?,?)`, [name, profile], function (error, results) {
            if (error) {
                throw error
            }
            response.writeHead(302, { Location: "/author" })
            response.end()
        })
    })
}

exports.update = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body += data
    })
    request.on('end', function (data) {
        var post = qs.parse(body);
        var id = post.id;

        db.query(`SELECT * FROM topic`, function (error, topics) {
            db.query('SELECT * FROM author WHERE id = ?', [id], function (error, author) {
                if (error) { throw error }
                db.query(`SELECT * FROM author`, function (error, authors) {
                    var title = 'author';
                    var list = template.list(topics);
                    var authorTr = template.authorList(authors)
                    var html = template.HTML(title, list,
                        `
                        ${template.authorTable(authorTr)}
                        <form method="post" action="/author/update_process">
                            <input type="hidden" value=${author[0].id} name="id">
                            <p><input type="text" placeholder="name" value="${author[0].name}" name="name"></p>
                            <p><input type="text" placeholder="profile" value="${author[0].profile}" name="profile"></p>
                            <p><input type="submit" value="update"></p>
                        </form>
                    `, ''
                    );
                    response.writeHead(200);
                    response.end(html);
                })
            })
        })
    })
}

exports.update_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        console.log(post)
        db.query('UPDATE author SET name=?, profile=? WHERE id=?', [post.name, post.profile, post.id], function (error, result) {
            if (error) {
                throw error
            }
            response.writeHead(302, { Location: `/author` });
            response.end();
        })
    });
}



exports.delete_process = function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`DELETE FROM topic WHERE author_id=?`, [post.id], function (error1, result1) {
            if (error1) {
                throw error1;
            }
            db.query('DELETE FROM author WHERE id = ?', [post.id], function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/author` });
                response.end();
            });
        })
    });
}

