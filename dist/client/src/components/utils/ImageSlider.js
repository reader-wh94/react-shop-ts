"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var antd_1 = require("antd");
function ImageSlider(props) {
    return (<div>
      <antd_1.Carousel autoplay>
        {props.images.map(function (image, index) { return (<div key={index}>
            <img style={{ width: '100%', maxHeight: '150px' }} src={"http://localhost:5000/" + image}/>
          </div>); })}
      </antd_1.Carousel>
    </div>);
}
exports.default = ImageSlider;
