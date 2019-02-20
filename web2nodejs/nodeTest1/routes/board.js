var express = require('express');
var router = express.Router()
var fs = require('fs')
var pool = require('../db/db_config');
var path = require('path')
var css = []
var logid = null;
router.get('*', (req, res, next) => {
    fs.readdir(path.join(__dirname, '../public'), (err, files) => {
        if (err) {
            throw err
        }
        css = files;
        logid = req.cookies.id;
        next();
    })
})

router.get('/', (req, res) => {
    pool.query('SELECT * FROM page', function (error, results, fields) {
        if (error) throw error;


        res.render('index', { title: "main", css: css, lists: results, logid: logid })
    });
})

router.get('/page/:id', (req, res) => {
    pool.query('SELECT * FROM page', function (error, results, fields) {
        pool.query(`SELECT * FROM page WHERE pk=?`, [req.params.id], function (error, result, fields) {
            if (error) throw error;
            var result = result[0]
            res.render('detail', { title: result.title, css: css, lists: results, target: result, logid: logid })
        });
    })
})

router.get('/create', (req, res) => {
    res.render('create', { title: 'create', css: css, logid: logid })
})

router.post('/create_process', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    pool.query('INSERT INTO page (title,description,regDate) VALUE (?,?,now())', [title, description], function (error, result, fields) {
        if (error) throw error;
        res.status(302).redirect(`/page/${result.insertId}`)
    })
})

router.get('/update/:id', (req, res) => {
    pool.query(`SELECT * FROM page where pk =?`, [req.params.id], (error, result, fields) => {
        if (error) {
            throw error
        }
        res.render('update', { title: 'update', css: css, target: result[0], logid: logid })
    })
})

router.post('/update_process', (req, res) => {

    var title = req.body.title;
    var description = req.body.description;
    var pk = req.body.pk;

    pool.query(`UPDATE page  SET title=?, description=?, regDate=now() where pk = ?`, [title, description, pk], function (error, result, fields) {
        if (error) {
            throw error
        }
        res.redirect(`/page/${pk}`)
    })
})

router.post('/delete_process', (req, res) => {
    var pk = req.body.pk;
    pool.query(`DELETE FROM page where pk = ?`, [pk], function (error, result, fields) {
        if (error) {
            throw error
        }
        res.redirect(`/`)
    })
})

module.exports = router;