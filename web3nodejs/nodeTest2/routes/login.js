var express = require('express');
var router = express.Router();
const dbPool = require('../db/db_config');
var boardUrl = "login/"
var isLogin = false;

router.get('/', async (req, res) => {
    res.render(`${boardUrl}index`, { title: 'loginPage', isLogin: isLogin })
})


router.get('/joinus', (req, res) => {
    res.render(`${boardUrl}joinus`, { title: 'joinus', isLogin: isLogin })
})


router.post('/joinus_process', (req, res) => {
    dbPool.query(`INSERT INTO userinfo (id,password,name) VALUES (?,?,?) `, [req.body.u_id, req.body.u_ps, req.body.u_name], (err, result, fields) => {
        if (err) {
            console.error(err)
            res.redirect('/login/joinus')
        } else {
            isLogin = true;
            res.redirect('/board/')
        }
    })
})


router.post('/login_process', (req, res) => {
    var userID = req.body['user_ID'];
    var userPS = req.body['user_PS'];

    dbPool.query(`SELECT * FROM userinfo where id=? and password =?`, [userID, userPS], (err, result, fields) => {
        if (err) {
            console.error(err)
        }
        if (result.length === 0) { //로그인 실패
            res.redirect('/login')
        } else {//로그인 성공
            req.session.userID = userID
            req.session.save(() => {
                res.redirect('/board')
            });

        }
    })
})


router.get('/logout_process', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/login')
        console.log(req.session)

    })

})






// router.post('/joinus_process_confirm', (req, res) => {

//     dbPool.query(`select * from userinfo where id=?`, [req.body.value], (err, result, fields) => {
//         if (err) {
//             console.error(err)
//         }

//         if (result[0]) {
//             res.json({ code: 99, msg: '값이 있습니다' })
//         } else {
//             res.json({ code: 00, msg: '사용해도 됩니다' })
//         }
//     })
// })


// router.get('/:id', (req, res) => {
//     var paramId = req.params.id;
//     dbPool.query('select * from page where pk=?', [paramId], function (err, result, fields) {
//         var boardList = result;
//         res.render(`${boardUrl}detail`, { title: 'detail', boardList: boardList[0] })
//     })
// })

// router.post('/update_process', (req, res) => {
//     var title = req.body.title;
//     var dec = req.body.dec;
//     var pk = req.body.pk;
//     dbPool.query(`UPDATE page SET title =?,description=?,regDate=now() where pk=?`, [title, dec, pk], (err, result, fields) => {
//         if (err) {
//             console.error(err)
//         }
//         res.redirect(`/board`)
//     })
// })

// router.post('/delete_process', (req, res) => {
//     var pk = req.body.pk;
//     dbPool.query(`DELETE FROM page WHERE pk=?;`, [pk], (err, result, fields) => {
//         if (err) {
//             console.error(err)
//         }
//         res.redirect(`/board`)
//     })
// })

module.exports = router;