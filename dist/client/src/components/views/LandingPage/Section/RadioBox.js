"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var Panel = antd_1.Collapse.Panel;
function RadioBox(props) {
    var _a = react_1.useState(0), Value = _a[0], setValue = _a[1];
    var renderRadioBox = function () { return (props.list && props.list.map(function (value) { return (<antd_1.Radio key={value._id} value={value._id}> {value.name} </antd_1.Radio>); })); };
    var handleChange = function (event) {
        setValue(event.target.value);
        props.handleFilters(event.target.value);
    };
    return (<div>
      <antd_1.Collapse defaultActiveKey={['1']}>
        <Panel header="Price" key="1">

        <antd_1.Radio.Group onChange={handleChange} value={Value}>
          {renderRadioBox()}
        </antd_1.Radio.Group>
          
        </Panel>
      </antd_1.Collapse>
    </div>);
}
exports.default = RadioBox;
