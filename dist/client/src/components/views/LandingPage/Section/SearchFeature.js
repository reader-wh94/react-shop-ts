"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var Search = antd_1.Input.Search;
function SearchFeature(props) {
    var _a = react_1.useState(""), SearchTerm = _a[0], setSearchTerm = _a[1];
    var searchHandler = function (event) {
        setSearchTerm(event.currentTarget.value);
        props.refreshFunction(event.currentTarget.value);
    };
    return (<div>
      <Search placeholder="input search text" onChange={searchHandler} style={{ width: 200 }}/>
    </div>);
}
exports.default = SearchFeature;
