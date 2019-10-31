const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        config: {
            title: '挖坑大队'
        }
    })
});

module.exports = router;