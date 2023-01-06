"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSuccessBuy = exports.removeCartItem = exports.getCartItems = exports.addToCart = exports.logoutUser = exports.auth = exports.loginUser = exports.registerUser = void 0;
var axios_1 = require("axios");
var types_1 = require("./types");
var Config_js_1 = require("../components/Config.js");
function registerUser(dataToSubmit) {
    var request = axios_1.default.post(Config_js_1.USER_SERVER + "/register", dataToSubmit)
        .then(function (response) { return response.data; });
    return {
        type: types_1.REGISTER_USER,
        payload: request
    };
}
exports.registerUser = registerUser;
function loginUser(dataToSubmit) {
    var request = axios_1.default.post(Config_js_1.USER_SERVER + "/login", dataToSubmit)
        .then(function (response) { return response.data; });
    return {
        type: types_1.LOGIN_USER,
        payload: request
    };
}
exports.loginUser = loginUser;
function auth() {
    var request = axios_1.default.get(Config_js_1.USER_SERVER + "/auth")
        .then(function (response) { return response.data; });
    return {
        type: types_1.AUTH_USER,
        payload: request
    };
}
exports.auth = auth;
function logoutUser() {
    var request = axios_1.default.get(Config_js_1.USER_SERVER + "/logout")
        .then(function (response) { return response.data; });
    return {
        type: types_1.LOGOUT_USER,
        payload: request
    };
}
exports.logoutUser = logoutUser;
function addToCart(id) {
    var body = {
        productId: id
    };
    var request = axios_1.default.post(Config_js_1.USER_SERVER + "/addToCart", body)
        .then(function (response) { return response.data; });
    return {
        type: types_1.ADD_TO_CART,
        payload: request
    };
}
exports.addToCart = addToCart;
function getCartItems(cartItems, userCart) {
    var request = axios_1.default.get("/api/product/products_by_id?id=" + cartItems + "&type=array")
        .then(function (response) {
        // CartItem에 해당하는 정보들을
        // Product Collection에서 가져온 후에 
        // Quantity 정보를 넣어준다
        userCart.forEach(function (cartItem) {
            response.data.forEach(function (productDetail, index) {
                if (cartItem.id === productDetail._id) {
                    response.data[index].quantity = cartItem.quantity;
                }
            });
        });
        return response.data;
    });
    return {
        type: types_1.GET_CART_ITEMS,
        payload: request
    };
}
exports.getCartItems = getCartItems;
function removeCartItem(productId) {
    var request = axios_1.default.get("/api/users/removeFromCart?id=" + productId)
        .then(function (response) {
        // productInfo, cart 정보를 조합해서 cartDetail를 만듦
        response.data.cart.forEach(function (item) {
            response.data.productInfo.forEach(function (product, index) {
                if (item.id === product._id) {
                    response.data.productInfo[index].quantity = item.quantity;
                }
            });
        });
        return response.data;
    });
    return {
        type: types_1.REMOVE_CART_ITEM,
        payload: request
    };
}
exports.removeCartItem = removeCartItem;
function onSuccessBuy(data) {
    var request = axios_1.default.post("/api/users/successBuy", data)
        .then(function (response) { return response.data; });
    return {
        type: types_1.ON_SUCCESS_BUY,
        payload: request
    };
}
exports.onSuccessBuy = onSuccessBuy;
