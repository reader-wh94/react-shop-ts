"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./UserCardBlock.css");
var antd_1 = require("antd");
function UserCardBlock(props) {
    var renderCartImage = function (images) {
        if (images.length > 0) {
            var image = images[0];
            return "http://localhost:5000/" + image;
        }
    };
    var renderItems = function () { return (props.products && props.products.map(function (product, index) { return (<tr key={index}>
        <td>
          <img style={{ width: '70px' }} alt="product" src={renderCartImage(product.images)}/>
        </td>
        <td>
          {product.quantity} EA
        </td>
        <td>
          $ {product.price}
        </td>
        <td>
          <antd_1.Button onClick={function () { return props.removeItem(product._id); }}>
            Remove
          </antd_1.Button>
        </td>
      </tr>); })); };
    return (<div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead> 
        <tbody>
          {renderItems()}
        </tbody>
      </table>
    </div>);
}
exports.default = UserCardBlock;
