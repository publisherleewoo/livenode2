var mysql = require('mysql');
var db_info = require('./db_important');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: db_info.host,
    user: db_info.user,
    password: db_info.password,
    database: db_info.database
});

module.exports = pool;