
module.exports = {
    HTML: function (title, body) {
        return `
        <!doctype html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="Author" content="">
            <meta name="Keywords" content="">
            <meta name="Description" content="">
            <title>${title}</title>
        </head>
        <body>
            ${body}
        </body>
        </html>
        `
    }
}