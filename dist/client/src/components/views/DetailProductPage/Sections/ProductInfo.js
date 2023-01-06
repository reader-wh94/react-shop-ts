"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var user_actions_1 = require("../../../../_actions/user_actions");
function ProductInfo(props) {
    var dispatch = react_redux_1.useDispatch();
    var clickHandler = function () {
        dispatch(user_actions_1.addToCart(props.detail._id));
    };
    return (<div>
      <antd_1.Descriptions title="Product Info">
        <antd_1.Descriptions.Item label="Price">{props.detail.price}</antd_1.Descriptions.Item>
        <antd_1.Descriptions.Item label="Sold">{props.detail.sold}</antd_1.Descriptions.Item>
        <antd_1.Descriptions.Item label="View">{props.detail.view}</antd_1.Descriptions.Item>
        <antd_1.Descriptions.Item label="Description">{props.detail.description}</antd_1.Descriptions.Item>
      </antd_1.Descriptions>

      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <antd_1.Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </antd_1.Button>

      </div>
    </div>);
}
exports.default = ProductInfo;
