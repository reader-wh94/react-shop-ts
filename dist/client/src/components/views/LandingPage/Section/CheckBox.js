"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var Panel = antd_1.Collapse.Panel;
function CheckBox(props) {
    var _a = react_1.useState([]), Checked = _a[0], setChecked = _a[1];
    var handleToggle = function (value) {
        var currendIndex = Checked.indexOf(value);
        var newChecked = __spreadArrays(Checked);
        if (currendIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currendIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };
    var renderCheckboxLists = function () { return props.list && props.list.map(function (value, index) { return (<react_1.default.Fragment key={index}>
      <antd_1.Checkbox onChange={function () { return handleToggle(value._id); }} checked={Checked.indexOf(value._id) === -1 ? false : true}/>
        <span>{value.name}</span>
    </react_1.default.Fragment>); }); };
    return (<div>
      <antd_1.Collapse defaultActiveKey={['1']}>
        <Panel header="Continents" key="1">

          {renderCheckboxLists()}
          
        </Panel>
      </antd_1.Collapse>
    </div>);
}
exports.default = CheckBox;
