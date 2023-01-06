"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
var FileUpload_1 = require("../../utils/FileUpload");
var axios_1 = require("axios");
var TextArea = antd_1.Input.TextArea;
var Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
];
function UploadProudctPage(props) {
    var _a = react_1.useState(""), Title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(""), Description = _b[0], setDescription = _b[1];
    var _c = react_1.useState(""), Price = _c[0], setPrice = _c[1];
    var _d = react_1.useState(1), Continent = _d[0], setContinent = _d[1];
    var _e = react_1.useState([]), Images = _e[0], setImages = _e[1];
    var titleChangeHandler = function (event) {
        setTitle(event.currentTarget.value);
    };
    var descriptionChangeHandler = function (event) {
        setDescription(event.currentTarget.value);
    };
    var priceChangeHandler = function (event) {
        setPrice(event.currentTarget.value);
    };
    var continentChangeHandler = function (event) {
        setContinent(event.currentTarget.value);
    };
    var updateImages = function (newImages) {
        setImages(newImages);
    };
    var submitHandler = function (event) {
        event.preventDefault();
        if (!Title || !Description || !Price || !Continent || Images.length == 0) {
            return alert("모든 값을 넣어주셔야 합니다.");
        }
        //server에 채울 값을들 request로 보낸다.
        var body = {
            // 로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        };
        axios_1.default.post("/api/product", body)
            .then(function (response) {
            if (response.data.success) {
                alert("상품 업로드에 성공 했습니다.");
                props.history.push('/');
            }
            else {
                alert("상품 업로드에 실패 했습니다.");
            }
        });
    };
    return (<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>여행 상품 업로드</h2>
      </div>
      
      <antd_1.Form onSubmit={submitHandler}>
        
        <FileUpload_1.default refreshFunction={updateImages}/>
        <br />
        <br />
        <label>이름</label>
        <antd_1.Input onChange={titleChangeHandler} value={Title}/>
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description}/>
        <br />
        <br />
        <label>가격($)</label>
        <antd_1.Input type="number" onChange={priceChangeHandler} value={Price}/>
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map(function (item) { return (<option key={item.key} value={item.key}>{item.value}</option>); })}
          
        </select>
        <br />
        <br />
        <antd_1.Button onClick={submitHandler}>
          확인
        </antd_1.Button>
      </antd_1.Form>
    </div>);
}
exports.default = UploadProudctPage;
