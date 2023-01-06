"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("react-app-polyfill/ie9");
require("react-app-polyfill/ie11");
require("core-js");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./index.css");
var App_1 = require("./components/App");
var serviceWorker = require("./serviceWorker");
var react_router_dom_1 = require("react-router-dom");
var _reducers_1 = require("./_reducers");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_promise_1 = require("redux-promise");
var redux_thunk_1 = require("redux-thunk");
var createStoreWithMiddleware = redux_1.applyMiddleware(redux_promise_1.default, redux_thunk_1.default)(redux_1.createStore);
react_dom_1.default.render(<react_redux_1.Provider store={createStoreWithMiddleware(_reducers_1.default, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <react_router_dom_1.BrowserRouter>
            <App_1.default />
        </react_router_dom_1.BrowserRouter>
    </react_redux_1.Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
