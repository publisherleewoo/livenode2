var express = require('express');
var router = express.Router();
const dbPool = require('../db/db_config');
var boardUrl = "login/"


router.get('/', async (req, res) => {
    res.render(`${boardUrl}index`, { title: 'loginPage' })
})


router.get('/joinus', (req, res) => {

    res.render(`${boardUrl}joinus`, { title: 'joinus' })
})


router.post('/joinus_process', (req, res) => {
    console.log('성공')
    dbPool.query(`INSERT INTO userinfo (id,password,name) VALUES (?,?,?) `, [req.body.u_id, req.body.u_ps, req.body.u_name], (err, result, fields) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/board/')
    })
})

router.post('/joinus_process_confirm', (req, res) => {

    dbPool.query(`select * from userinfo where id=?`, [req.body.value], (err, result, fields) => {
        if (err) {
            console.error(err)
        }

        if (result[0]) {
            res.json({ code: 99, msg: '값이 있습니다' })
        } else {
            res.json({ code: 00, msg: '사용해도 됩니다' })
        }
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