"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_paypal_express_checkout_1 = require("react-paypal-express-checkout");
var Paypal = /** @class */ (function (_super) {
    __extends(Paypal, _super);
    function Paypal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paypal.prototype.render = function () {
        var _this = this;
        var onSuccess = function (payment) {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);
            _this.props.onSuccess(payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        };
        var onCancel = function (data) {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        };
        var onError = function (err) {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        };
        var env = 'sandbox'; // you can set here to 'production' for production
        var currency = 'USD'; // or you can set this value from your props or state
        var total = this.props.total; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        var client = {
            sandbox: 'ATHoaUPgCKoNOD4pExA8Nx_lszXC5VN2QPGdswTRv5i_v0VPFVIs8jCGdVmcZuMwWNHeV10Z1RMDXhRl',
            production: 'YOUR-PRODUCTION-APP-ID',
        };
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (<react_paypal_express_checkout_1.default env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
        }}/>);
    };
    return Paypal;
}(react_1.default.Component));
exports.default = Paypal;
