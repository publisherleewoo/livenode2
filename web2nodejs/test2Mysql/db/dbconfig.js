var mysql = require('mysql');
var pool = mysql.createPool({

    host: 'localhost',

    user: 'root',

    password: '1234',

    database: 'livecording',

    connectionLimit: 20,

    waitForConnections: false

});






module.exports = pool