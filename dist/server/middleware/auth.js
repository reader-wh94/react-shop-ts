var User = require('../models/User').User;
var auth = function (req, res, next) {
    var token = req.cookies.w_auth;
    User.findByToken(token, function (err, user) {
        if (err)
            throw err;
        if (!user)
            return res.json({
                isAuth: false,
                error: true
            });
        req.token = token;
        req.user = user;
        next();
    });
};
module.exports = { auth: auth };
