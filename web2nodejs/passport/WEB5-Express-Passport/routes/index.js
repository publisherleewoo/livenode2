var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

router.get('/', function (request, response) {
    console.log('/', request.user) //passport를 사용해서 serializeUser가 실행되면, request.user에 주입된다
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
        `
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
        `<a href="/topic/create">create</a>`,
        auth.statusUI(request, response)
    );
    response.send(html);
});

module.exports = router;