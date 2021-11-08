const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-double')(mongoose);

var essential = new Schema({
    essential_id: {type: Schema.Types.ObjectId, required: true, ref: 'Essential'},
    quantity: {type: Number}
}, {
    timestamps: true,
    _id: false
} )

const Car_Status = new Schema({
    status_id: {type: Schema.Types.ObjectId, required: true, ref:"Status"},
    start_receive_time: {type: Date, required: true},
    departure_time: {type: Date, required: true},
    location_start: {type: String, required: true},
    location_finish:{type: String, required: true},
    note:{type: String},
    picture: {type: String, },
    receiving_status:{type: Boolean},
    shipping_status:{type: Boolean},
    censorship:{type: Boolean},
    car_id:{type: Schema.Types.ObjectId, ref:"Car", require: true},
    essentials: [essential]
}, {
    timestamps: true
})
Car_Status.index({"status_id":1}, {unique: true});

module.exports = mongoose.model('Car_status', Car_Status);
