const mysql = require('mysql');
const db_info = require('./db_info')
module.exports = mysql.createPool({
    connectionLimit: 10,
    host: db_info.host,
    user: db_info.user,
    password: db_info.password,
    database: db_info.database
})