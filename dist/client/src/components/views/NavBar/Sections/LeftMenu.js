"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var SubMenu = antd_1.Menu.SubMenu;
var MenuItemGroup = antd_1.Menu.ItemGroup;
function LeftMenu(props) {
    return (<antd_1.Menu mode={props.mode}>
    <antd_1.Menu.Item key="mail">
      <a href="/">Home</a>
    </antd_1.Menu.Item>
    <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <antd_1.Menu.Item key="setting:1">Option 1</antd_1.Menu.Item>
        <antd_1.Menu.Item key="setting:2">Option 2</antd_1.Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <antd_1.Menu.Item key="setting:3">Option 3</antd_1.Menu.Item>
        <antd_1.Menu.Item key="setting:4">Option 4</antd_1.Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </antd_1.Menu>);
}
exports.default = LeftMenu;
