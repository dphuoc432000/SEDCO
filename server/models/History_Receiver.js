const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var essential = new Schema({
    essential_id: {type: Schema.Types.ObjectId, required: true, ref: 'Essential'},
    quantity: {type: Number}
}, {
    _id: false
} )

const History_receiver = new Schema({
    car_status_id: {type: Schema.Types.ObjectId, ref: 'Car_status', required:true},
    receiver_status_id:{type: Schema.Types.ObjectId, ref: 'Receiver_status', required: true},
    receiver_time: {type: Date, required: true},
    receiver_confirm: {type: Boolean},
    car_confirm: {type: Boolean},
    essentials_current_car: [essential],
    essentials_current_receiver: [essential],
    essentials: [essential]
}, {
    timestamps: true
})

module.exports = mongoose.model('History_receiver', History_receiver);