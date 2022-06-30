const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
    IdProduct: {
        type: String,
        ref: 'Product',
        required: true,
    },
    ItemNum: {
        type: Number,
        required: true,
    },
    IdUser: {
        type: String,
        ref: 'User',
        required: true,
    },
}, { versionKey: false }) // bỏ __v trong document in mongoose

module.exports = mongoose.model('Cart', Cart, 'Cart')