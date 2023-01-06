"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
function Footer() {
    return (<div style={{
        height: '80px', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', fontSize: '1rem'
    }}>
           <p> Happy Coding  <antd_1.Icon type="smile"/></p>
        </div>);
}
exports.default = Footer;
