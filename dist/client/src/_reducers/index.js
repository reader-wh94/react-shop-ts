"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var user_reducer_1 = require("./user_reducer");
var rootReducer = redux_1.combineReducers({
    user: user_reducer_1.default,
});
exports.default = rootReducer;
