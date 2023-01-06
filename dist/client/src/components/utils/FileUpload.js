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
var react_dropzone_1 = require("react-dropzone");
var antd_1 = require("antd");
var axios_1 = require("axios");
function FileUpload(props) {
    var _a = react_1.useState([]), Images = _a[0], setImages = _a[1];
    var dropHandler = function (files) {
        var formData = new FormData();
        var config = {
            headers: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);
        axios_1.default.post('/api/product/image', formData, config)
            .then(function (response) {
            if (response.data.success) {
                setImages(__spreadArrays(Images, [response.data.filePath]));
                props.refreshFunction(__spreadArrays(Images, [response.data.filePath]));
            }
            else {
                alert('파일을 저장하는데 실패했습니다.');
            }
        });
    };
    var deleteHandler = function (image) {
        var currentIndex = Images.indexOf(image);
        var newImages = __spreadArrays(Images);
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    };
    return (<div style={{ display: 'flex', justifyContent: 'sapce-between' }}>
      <react_dropzone_1.default onDrop={dropHandler}>
        {function (_a) {
        var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
        return (<div style={{
            width: 300, height: 240, border: '1px solid lightgray',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} {...getRootProps()}>
              <input {...getInputProps()}/>
              <antd_1.Icon type="plus" style={{ fontSize: '3rem' }}/>
            </div>);
    }}
      </react_dropzone_1.default>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {Images.map(function (image, index) { return (<div onClick={function () { return deleteHandler(image); }} key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={"http://localhost:5000/" + image}/>
          </div>); })}

      </div>
    </div>);
}
exports.default = FileUpload;
