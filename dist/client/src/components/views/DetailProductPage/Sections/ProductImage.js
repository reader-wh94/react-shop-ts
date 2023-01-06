"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_image_gallery_1 = require("react-image-gallery");
function ProductImage(props) {
    var _a = react_1.useState([]), Images = _a[0], setImages = _a[1];
    react_1.useEffect(function () {
        if (props.detail.images && props.detail.images.length > 0) {
            var images_1 = [];
            props.detail.images.map(function (item) {
                images_1.push({
                    original: "http://localhost:5000/" + item,
                    thumbnail: "http://localhost:5000/" + item
                });
            });
            setImages(images_1);
        }
    }, [props.detail]);
    return (<div>
      <react_image_gallery_1.default items={Images}/>
    </div>);
}
exports.default = ProductImage;
