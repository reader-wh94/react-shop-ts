"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsx-a11y/anchor-is-valid */
var react_1 = require("react");
var antd_1 = require("antd");
var axios_1 = require("axios");
var Config_1 = require("../../../Config");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
function RightMenu(props) {
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var logoutHandler = function () {
        axios_1.default.get(Config_1.USER_SERVER + "/logout").then(function (response) {
            if (response.status === 200) {
                props.history.push("/login");
            }
            else {
                alert('Log Out Failed');
            }
        });
    };
    if (user.userData && !user.userData.isAuth) {
        return (<antd_1.Menu mode={props.mode}>
        <antd_1.Menu.Item key="mail">
          <a href="/login">Signin</a>
        </antd_1.Menu.Item>
        <antd_1.Menu.Item key="app">
          <a href="/register">Signup</a>
        </antd_1.Menu.Item>
      </antd_1.Menu>);
    }
    else {
        return (<antd_1.Menu mode={props.mode}>
        <antd_1.Menu.Item key="history">
          <a href="/history">History</a>
        </antd_1.Menu.Item>

        <antd_1.Menu.Item key="upload">
          <a href="product/upload">Upload</a>
        </antd_1.Menu.Item>
        
        <antd_1.Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <antd_1.Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" className="head-example" style={{ marginRight: -22, color: '#66777' }}>
              <antd_1.Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }}/>
            </a>
          </antd_1.Badge>
        </antd_1.Menu.Item>
        
        <antd_1.Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </antd_1.Menu.Item>
      </antd_1.Menu>);
    }
}
exports.default = react_router_dom_1.withRouter(RightMenu);
