var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
});
var Product = mongoose.model('Product', productSchema);
module.exports = { Product: Product };
