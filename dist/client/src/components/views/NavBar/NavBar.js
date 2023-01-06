"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var LeftMenu_1 = require("./Sections/LeftMenu");
var RightMenu_1 = require("./Sections/RightMenu");
var antd_1 = require("antd");
require("./Sections/Navbar.css");
function NavBar() {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var showDrawer = function () {
        setVisible(true);
    };
    var onClose = function () {
        setVisible(false);
    };
    return (<nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu_1.default mode="horizontal"/>
        </div>
        <div className="menu_rigth">
          <RightMenu_1.default mode="horizontal"/>
        </div>
        <antd_1.Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
          <antd_1.Icon type="align-right"/>
        </antd_1.Button>
        <antd_1.Drawer title="Basic Drawer" placement="right" className="menu_drawer" closable={false} onClose={onClose} visible={visible}>
          <LeftMenu_1.default mode="inline"/>
          <RightMenu_1.default mode="inline"/>
        </antd_1.Drawer>
      </div>
    </nav>);
}
exports.default = NavBar;
