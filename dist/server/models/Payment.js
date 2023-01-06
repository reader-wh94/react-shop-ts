var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true });
var Payment = mongoose.model('Payment', paymentSchema);
module.exports = { Payment: Payment };
