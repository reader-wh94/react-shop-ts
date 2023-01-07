"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_1 = require("../hoc/auth");
// pages for this product
var LandingPage_js_1 = require("./views/LandingPage/LandingPage.js");
var LoginPage_js_1 = require("./views/LoginPage/LoginPage.js");
var RegisterPage_js_1 = require("./views/RegisterPage/RegisterPage.js");
var NavBar_1 = require("./views/NavBar/NavBar");
var Footer_1 = require("./views/Footer/Footer");
var UploadProductPage_1 = require("./views/UploadProductPage/UploadProductPage");
var DetailProductPage_1 = require("./views/DetailProductPage/DetailProductPage");
var CartPage_1 = require("./views/CartPage/CartPage");
var HistoryPage_1 = require("./views/HistoryPage/HistoryPage");
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside
function App() {
    return (<react_1.Suspense fallback={(<div>Loading...</div>)}>
      <NavBar_1.default />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route exact path="/" component={auth_1.default(LandingPage_js_1.default, null)}/>
          <react_router_dom_1.Route exact path="/login" component={auth_1.default(LoginPage_js_1.default, false)}/>
          <react_router_dom_1.Route exact path="/register" component={auth_1.default(RegisterPage_js_1.default, false)}/>
          <react_router_dom_1.Route exact path="/product/upload" component={auth_1.default(UploadProductPage_1.default, true)}/>
          <react_router_dom_1.Route exact path="/product/:productId" component={auth_1.default(DetailProductPage_1.default, null)}/>
          <react_router_dom_1.Route exact path="/user/cart" component={auth_1.default(CartPage_1.default, true)}/>
          <react_router_dom_1.Route exact path="/history" component={auth_1.default(HistoryPage_1.default, true)}/>
        </react_router_dom_1.Switch>
      </div>
      <Footer_1.default />
    </react_1.Suspense>);
}
exports.default = App;
