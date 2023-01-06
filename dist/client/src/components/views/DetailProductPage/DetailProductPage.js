"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var ProductInfo_1 = require("./Sections/ProductInfo");
var ProductImage_1 = require("./Sections/ProductImage");
var antd_1 = require("antd");
function DetailProductPage(props) {
    var productId = props.match.params.productId;
    var _a = react_1.useState({}), Product = _a[0], setProduct = _a[1];
    react_1.useEffect(function () {
        axios_1.default.get("/api/product/products_by_id?id=" + productId + "&type=single")
            .then(function (response) {
            setProduct(response.data[0]);
        })
            .catch(function (err) { return alert(err); });
    }, []);
    return (<div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>
      <br />
      
      <antd_1.Row gutter={[16, 16]}>
        <antd_1.Col lg={12} sm={24}>
          <ProductImage_1.default detail={Product}/>
        </antd_1.Col>
        <antd_1.Col lg={12} sm={24}>
          <ProductInfo_1.default detail={Product}/>
        </antd_1.Col>
      </antd_1.Row>

    </div>);
}
exports.default = DetailProductPage;
