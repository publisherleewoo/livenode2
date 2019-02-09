var http = require('http');
var cookie = require('cookie');
http.createServer(function (request, response) {
    console.log(request.headers.cookie);
    var cookies = {};
    if (request.headers.cookie !== undefined) {
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    // response.writeHead(200, {
    //     'Set-Cookie': [
    //         `yummy_cookie=choco;Max-Age=${1}`,
    //         `tasty_cookie=strawberry;Max-Age=${1}`,
    //         `Permanent = cookies; Max-Age=${60 * 60 * 24 * 30}`
    //     ]
    // });
    response.end('abc!!');
}).listen(3000);