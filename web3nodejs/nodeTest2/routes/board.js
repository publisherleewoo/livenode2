var express = require('express');
var router = express.Router();
const dbPool = require('../db/db_config');
var boardUrl = "board/"


router.get('/', async (req, res) => {
    dbPool.query(`select * from page`, (err, results, fields) => {
        if (err) {
            console.error(err)
        }
        var boardList = results;
        res.render(`${boardUrl}index`, { title: 'main', boardList: boardList })
    })
})

router.get('/add', (req, res) => {
    res.render(`${boardUrl}add`, { title: 'add' })
})

router.post('/add_process', (req, res) => {
    var title = req.body.title;
    var dec = req.body.dec;
    dbPool.query(`INSERT INTO page (title,description,regDate) VALUES (?,?,now() )`, [title, dec], (err, result, fields) => {
        if (err) {
            console.error(err)
        }
        res.redirect(`/board`)
    })
})

router.get('/:id', (req, res) => {
    var paramId = req.params.id;
    dbPool.query('select * from page where pk=?', [paramId], function (err, result, fields) {
        var boardList = result;
        res.render(`${boardUrl}detail`, { title: 'detail', boardList: boardList[0] })
    })
})

router.post('/update_process', (req, res) => {
    var title = req.body.title;
    var dec = req.body.dec;
    var pk = req.body.pk;
    dbPool.query(`UPDATE page SET title =?,description=?,regDate=now() where pk=?`, [title, dec, pk], (err, result, fields) => {
        if (err) {
            console.error(err)
        }
        res.redirect(`/board`)
    })
})

router.post('/delete_process', (req, res) => {
    var pk = req.body.pk;
    dbPool.query(`DELETE FROM page WHERE pk=?;`, [pk], (err, result, fields) => {
        if (err) {
            console.error(err)
        }
        res.redirect(`/board`)
    })
})

module.exports = router;