var express = require('express');
var router = express.Router();
var multer = require('multer');
var Product = require('../models/Product').Product;
//=================================
//             Product
//=================================
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: storage }).single("file");
router.post('/image', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.json({ success: false, err: err });
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});
router.post('/', function (req, res) {
    // 받아온 정보들을 db에 저장
    var product = new Product(req.body);
    product.save(function (err) {
        if (err)
            return res.status(400).json({ success: false, err: err });
        return res.status(200).json({ success: true });
    });
});
router.post('/products', function (req, res) {
    // product collection에 들어이쓴 모든 상품 정보를 가져오기
    var limit = req.body.limit ? parseInt(req.body.limit) : 20;
    var skip = req.body.skip ? parseInt(req.body.skip) : 0;
    var term = req.body.searchTerm;
    var findArgs = {};
    for (var key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    // greater than euqal
                    $gte: req.body.filters[key][0],
                    // less than equal
                    $lte: req.body.filters[key][1]
                };
            }
            else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec(function (err, productInfo) {
            if (err)
                return res.status(400).json({ success: false, err: err });
            return res.status(200).json({
                success: true,
                productInfo: productInfo,
                postSize: productInfo.length
            });
        });
    }
    else {
        Product.find(findArgs)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec(function (err, productInfo) {
            if (err)
                return res.status(400).json({ success: false, err: err });
            return res.status(200).json({
                success: true,
                productInfo: productInfo,
                postSize: productInfo.length
            });
        });
    }
});
router.get('/products_by_id', function (req, res) {
    // query를 사용했기 때문에 body가 아닌 query를 사용
    var type = req.query.type;
    var productIds = req.query.id;
    if (type === "array") {
        // id=12312324, 234542, 123345 를
        // productIds = ['12312324', '234542', '123345'] 로 바꿔주기
        var ids = req.query.id.split(',');
        productIds = ids.map(function (item) {
            return item;
        });
    }
    // productId를 이용해서 DB에서 상품을 가져옴
    Product.find({ _id: { $in: productIds } })
        .populate('writer')
        .exec(function (err, product) {
        if (err)
            return res.status(400).send(err);
        return res.status(200).send(product);
    });
});
module.exports = router;
