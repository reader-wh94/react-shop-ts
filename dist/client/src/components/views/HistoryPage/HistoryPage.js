"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function HistoryPage(props) {
    return (<div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>History</h1>
      </div>
      <br />

      <table>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>
        </thead>

        <tbody>
          {props.user.userData &&
        props.user.userData.history.map(function (item) { return (<tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.dateOfPurchase}</td>
              </tr>); })}
        </tbody>
      </table>
      
    </div>);
}
exports.default = HistoryPage;
