const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Esquema 
const productsSchema = new Schema({

    sku: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock:{
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    }
});

//Export
module.exports = mongoose.model('Products', productsSchema);