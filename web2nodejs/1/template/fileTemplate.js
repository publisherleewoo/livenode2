var fs = require('fs');

module.exports = function fileTemplate(title, description, response) {
    var list = "<ul>";
    fs.readdir('./data', function (err, filelist) {
        filelist.forEach(function (file, index) {
            list += `<li><a href="/?id=${file}">${file}</a></li>`
        })
        list += "</ul>";
        var template = `
                <!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `;
        response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        response.end(template);
    })
}