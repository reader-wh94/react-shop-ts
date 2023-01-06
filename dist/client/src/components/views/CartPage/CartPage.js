"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var user_actions_1 = require("../../../_actions/user_actions");
var UserCardBlock_1 = require("./Sections/UserCardBlock");
var antd_1 = require("antd");
var Paypal_1 = require("../../utils/Paypal");
function CartPage(props) {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(0), Total = _a[0], setTotal = _a[1];
    var _b = react_1.useState(false), ShowTotal = _b[0], setShowTotal = _b[1];
    var _c = react_1.useState(false), ShowSuccess = _c[0], setShowSuccess = _c[1];
    react_1.useEffect(function () {
        var cartItems = [];
        // 리덕스 User state의 cart에 상품이 있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(function (item) {
                    cartItems.push(item.id);
                });
                dispatch(user_actions_1.getCartItems(cartItems, props.user.userData.cart))
                    .then(function (response) { calculateTotal(response.payload); });
            }
        }
    }, [props.user.userData]);
    var calculateTotal = function (cartDetail) {
        var total = 0;
        cartDetail.map(function (item) {
            total += parseInt(item.price, 10) * item.quantity;
        });
        setTotal(total);
        setShowTotal(true);
    };
    var removeFromCart = function (productId) {
        dispatch(user_actions_1.removeCartItem(productId))
            .then(function (respnse) {
            if (respnse.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
        });
    };
    var transactionSuccess = function (data) {
        dispatch(user_actions_1.onSuccessBuy({
            paymentData: data,
            cartDetail: props.user.cartDetail
        }))
            .then(function (response) {
            if (response.payload.success) {
                setShowTotal(false);
                setShowSuccess(true);
            }
        });
    };
    return (<div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock_1.default products={props.user.cartDetail} removeItem={removeFromCart}/>
      </div>

      {ShowTotal ?
        <div style={{ marginTop: '3rem' }}>
          <h2>Total Amount: ${Total}</h2>
        </div>
        : ShowSuccess ?
            <antd_1.Result status="success" title="Successfully Purchased Items!"/>
            :
                <>
          <br />
          <antd_1.Empty description={false}/>
        </>}

      {ShowTotal &&
        <Paypal_1.default total={Total} onSuccess={transactionSuccess}/>}

    </div>);
}
exports.default = CartPage;
