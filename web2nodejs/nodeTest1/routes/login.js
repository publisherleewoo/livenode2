var express = require('express');
var router = express.Router();
var cookie


router.get('/', (req, res) => {
    res.render('login/login', { title: '로그인' })
});

router.post('/login_process', (req, res) => {
    if (req.cookies.count === 'undefined' || req.cookies.count === undefined) {
        count = 0;
    } else {
        var count = parseInt(req.cookies.count);
        count++;
    }
    res.cookie('count', count, { maxAge: 60 * 60 * 24 * 30 })
    res.cookie('id', req.body.id, { maxAge: 60 * 60 * 24 * 30 })
    res.redirect('/')
});

router.get('/logout_process', (req, res) => {
    res.cookie('id', '', { maxAge: 0 })
    res.redirect('/')
    console.log('로그아웃')
})

module.exports = router;