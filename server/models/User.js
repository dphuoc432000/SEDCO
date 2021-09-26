const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    full_name: {type: String, maxlength: 50, required: true},
    age: {type: Number, min: 10, required: true},
    phone_number: {type: String, maxlength: 11, required: true},
    email: {type: String, maxlength: 30, required: true},
    city: {type:String, maxlength: 20, required: true},
    district: {type: String, maxlength: 20, required: true},
    address: {type: String, maxlength:100, required: true}
}, {
    timestamps:true
});

module.exports = mongoose.model('User', User);