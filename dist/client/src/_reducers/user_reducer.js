"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../_actions/types");
function default_1(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case types_1.REGISTER_USER:
            return __assign(__assign({}, state), { register: action.payload });
        case types_1.LOGIN_USER:
            return __assign(__assign({}, state), { loginSucces: action.payload });
        case types_1.AUTH_USER:
            return __assign(__assign({}, state), { userData: action.payload });
        case types_1.LOGOUT_USER:
            return __assign({}, state);
        case types_1.ADD_TO_CART:
            return __assign(__assign({}, state), { userData: __assign(__assign({}, state.userData), { cart: action.payload }) });
        case types_1.GET_CART_ITEMS:
            return __assign(__assign({}, state), { cartDetail: action.payload });
        case types_1.REMOVE_CART_ITEM:
            return __assign(__assign({}, state), { cartDetail: action.payload.productInfo, userData: __assign(__assign({}, state.userData), { cart: action.payload.cart }) });
        case types_1.ON_SUCCESS_BUY:
            return __assign(__assign({}, state), { cartDetail: action.payload.cartDetail, userData: __assign(__assign({}, state.userData), { cart: action.payload.cart }) });
        default:
            return state;
    }
}
exports.default = default_1;
