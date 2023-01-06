"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var antd_1 = require("antd");
var Meta_1 = require("antd/lib/card/Meta");
var CheckBox_1 = require("./Section/CheckBox");
var RadioBox_1 = require("./Section/RadioBox");
var ImageSlider_1 = require("../../utils/ImageSlider");
var Datas_1 = require("./Section/Datas");
var SearchFeature_1 = require("./Section/SearchFeature");
function LandingPage() {
    var _a = react_1.useState([]), Products = _a[0], setProducts = _a[1];
    var _b = react_1.useState(0), Skip = _b[0], setSkip = _b[1];
    var _c = react_1.useState(8), Limit = _c[0], setLimit = _c[1];
    var _d = react_1.useState(0), PostSize = _d[0], setPostSize = _d[1];
    var _e = react_1.useState({
        continents: [],
        price: []
    }), Filters = _e[0], setFilters = _e[1];
    var _f = react_1.useState(""), SearchTerm = _f[0], setSearchTerm = _f[1];
    react_1.useEffect(function () {
        var body = {
            skip: Skip,
            limit: Limit
        };
        getProducts(body);
    }, []);
    var getProducts = function (body) {
        axios_1.default.post('/api/product/products', body)
            .then(function (response) {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts(__spreadArrays(Products, response.data.productInfo));
                }
                else {
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
            }
            else {
                alert("상품들을 가져오는데 실패 했습니다.");
            }
        });
    };
    var loadMoreHandler = function () {
        var skip = Skip + Limit;
        var body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        };
        getProducts(body);
        setSkip(skip);
    };
    var renderCards = Products.map(function (product, index) {
        return <antd_1.Col lg={6} md={3} xs={24} key={index}>
            <antd_1.Card cover={<a href={"/product/" + product._id}><ImageSlider_1.default images={product.images}/></a>}>
                <Meta_1.default title={product.title} description={"$" + product.price}/>
            </antd_1.Card>
        </antd_1.Col>;
    });
    var showFilterResults = function (filters) {
        var body = {
            skip: 0,
            limit: Limit,
            filters: filters
        };
        getProducts(body);
        setSkip(0);
    };
    var handlePrice = function (value) {
        var data = Datas_1.price;
        var array = [];
        for (var key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    };
    var handleFilters = function (filters, category) {
        var newFilters = __assign({}, Filters);
        newFilters[category] = filters;
        if (category === "price") {
            var priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        showFilterResults(newFilters);
        setFilters(newFilters);
    };
    var updateSearchTerm = function (newSearchTerm) {
        var body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        };
        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    };
    return (<div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel AnyWhere <antd_1.Icon type='rocket'/></h2>

            </div>
            
            

        <antd_1.Row gutter={[16, 16]}>
            <antd_1.Col lg={12} xs={24}>
                
                <CheckBox_1.default list={Datas_1.continents} handleFilters={function (filters) { return handleFilters(filters, "continents"); }}/>
            </antd_1.Col>
            <antd_1.Col lg={12} xs={24}>
                
                <RadioBox_1.default list={Datas_1.price} handleFilters={function (filters) { return handleFilters(filters, "price"); }}/>
            </antd_1.Col>
        </antd_1.Row>


            
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
            <SearchFeature_1.default refreshFunction={updateSearchTerm}/>
            </div>
            

            

            <antd_1.Row gutter={[16, 16]}>
                {renderCards}
            </antd_1.Row>

            <br />
            {PostSize >= Limit &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <antd_1.Button onClick={loadMoreHandler}>더보기</antd_1.Button>
                </div>}
            


        </div>);
}
exports.default = LandingPage;
