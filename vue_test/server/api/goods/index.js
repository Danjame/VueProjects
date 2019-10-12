const Router = require('express').Router;
const router = Router();
const db = require('../../utils/db');

router.get('/all', async (req, res) => {
    // const { id } = req.query;
    const goods = await db.query('select * from good');
    const goods_id = [];
    goods.forEach((good) => {
        goods_id.push(good.good_id);
    });

    const price = await db.query('select * from good_price where good_id in(?)', [goods_id]);
    const imgs = await db.query('select * from good_img where good_id in (?)', [goods_id]);

    price.forEach((p) => {
        goods.forEach((good, index) => {
            if (p.good_id === good.good_id) {
                goods[index].price = goods[index].price || [];
                goods[index].price.push(p.good_price);
            }
        });
    })

    imgs.forEach((img) => {
        goods.forEach((good, index) => {
            if (img.good_id === good.good_id) {
                goods[index].imgs = goods[index].imgs || [];
                goods[index].imgs.push(img.good_img);
            }
        });
    })

    res.json({
        status: {
            code: '200',
            msg: 'ok'
        },
        data: goods
    })
});

router.get('/detail', async (req, res) => {
    const { id } = req.query;
    const info = await db.query('select * from good where goods_status != 1 and good_id = ?', [id]);
    if (!info.length) {
        res.json({
            status: {
                code: '200',
                msg: 'ok'
            },
            data: {}
        })
    }

    const result = await Promise.all([
        db.query('select * from good_price where good_id = ?', [id]),
        db.query('select * from good_img where good_id = ?', [id]),
        db.query('select * from goods_property where good_id = ?', [id]),
        db.query('select * from payment_method where good_id = ?', [id]),
        db.query('select * from goods_size where good_id = ?', [id])
    ]);

    res.json({
        status: {
            code: '200',
            msg: 'ok'
        },
        data: {
            info,
            price: result[0],
            imgs: result[1],
            property: result[2],
            payment: result[3],
            size: result[4]
        }
    })
});

router.get('/pay', async (req, res) => {
    const { id } = req.query;
    const info = await db.query('select * from good where goods_status != 1 and good_id = ?', [id]);

    const result = await Promise.all([
        db.query('select * from good_price where good_id = ?', [id]),
        db.query('select * from good_img where good_id = ?', [id]),
        db.query('select * from payment_method')
    ]);

    res.json({
        status: {
            code: '200',
            msg: 'ok'
        },
        data: {
            info,
            result
        }
    })
});

module.exports = router;