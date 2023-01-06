var express = require('express');
var router = express.Router();
var User = require("../models/User").User;
var Product = require('../models/Product').Product;
var Payment = require('../models/Payment').Payment;
var auth = require("../middleware/auth").auth;
var async = require('async');
//=================================
//             User
//=================================
router.get("/auth", auth, function (req, res) {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});
router.post("/register", function (req, res) {
    var user = new User(req.body);
    user.save(function (err, doc) {
        if (err)
            return res.json({ success: false, err: err });
        return res.status(200).json({
            success: true
        });
    });
});
router.post("/login", function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
            user.generateToken(function (err, user) {
                if (err)
                    return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                    loginSuccess: true, userId: user._id
                });
            });
        });
    });
});
router.get("/logout", auth, function (req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, function (err, doc) {
        if (err)
            return res.json({ success: false, err: err });
        return res.status(200).send({
            success: true
        });
    });
});
router.post("/addToCart", auth, function (req, res) {
    // USer Collection에 해당 유저의 정보를 가져오기
    User.findOne({ _id: req.user._id }, function (err, userInfo) {
        var duplicate = false;
        userInfo.cart.forEach(function (item) {
            if (item.id === req.body.productId) {
                duplicate = true;
            }
        });
        if (duplicate) {
            User.findOneAndUpdate({ _id: req.user._id, "cart.id": req.body.productId }, { $inc: { "cart.$.quantity": 1 } }, { new: true }, function (err, userInfo) {
                if (err)
                    return res.status(400).json({ success: false, err: err });
                res.status(200).send(userInfo.cart);
            });
        }
        else {
            User.findOneAndUpdate({ _id: req.user._id }, {
                $push: {
                    cart: {
                        id: req.body.productId,
                        quantity: 1,
                        date: Date.now()
                    }
                }
            }, { new: true }, function (err, userInfo) {
                if (err)
                    return res.status(400).json({ success: false, err: err });
                res.status(200).send(userInfo.cart);
            });
        }
    });
});
router.get('/removeFromCart', auth, function (req, res) {
    // cart 안에 원하는 상품 지우기
    User.findOneAndUpdate({ _id: req.user._id }, {
        "$pull": { "cart": { "id": req.query.id } }
    }, { new: true }, function (err, userInfo) {
        var cart = userInfo.cart;
        var array = cart.map(function (item) {
            return item.id;
        });
        Product.find({ _id: { $in: array } })
            .populate('writer')
            .exec(function (err, productInfo) {
            return res.status(200).json({
                productInfo: productInfo,
                cart: cart
            });
        });
    });
    // product collection에서 현재 남아있는 상품 정보 가져오기
});
router.post('/successBuy', auth, function (req, res) {
    // 1. User Collection의 History 필드 안에 간단한 결제 정보 저장
    var history = [];
    var transactionData = {};
    req.body.cartDetail.forEach(function (item) {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        });
    });
    // 2. Payment Collection에 자세한 결제 정보 저장
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    // history 저장
    User.findOneAndUpdate({ _id: req.user._id }, { $push: { history: history }, $set: { cart: [] } }, { new: true }, function (err, user) {
        if (err)
            return res.json({ success: false, err: err });
        // payment에다 transactionData 저장
        var payment = new Payment(transactionData);
        payment.save(function (err, doc) {
            if (err)
                return res.json({ success: false, err: err });
            // 3. Product Collection의 sold 필드 정보 업데이트
            var products = [];
            doc.product.forEach(function (item) {
                products.push({ id: item.id, quantity: item.quantity });
            });
            async.eachSeries(products, function (item, callback) {
                Product.update({ _id: item.id }, {
                    $inc: {
                        "sold": item.quantity
                    }
                }, { new: false }, callback);
            }, function (err) {
                if (err)
                    return res.status(400).json({ success: false, err: err });
                res.status(200).json({
                    success: true,
                    cart: user.cart,
                    cartDetail: []
                });
            });
        });
    });
});
module.exports = router;
