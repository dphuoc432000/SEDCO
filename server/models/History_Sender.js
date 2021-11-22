const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var essential = new Schema({
    essential_id: {type: Schema.Types.ObjectId, required: true, ref: 'Essential'},
    quantity: {type: Number}
}, {
    _id: false
} )

const History_sender = new Schema({
    car_status_id: {type: Schema.Types.ObjectId, ref: 'Car_status', required:true},
    sender_status_id:{type: Schema.Types.ObjectId, ref: 'Sender_status', required: true},
    sender_time: {type: Date, required: true},
    sender_confirm: {type: Boolean},
    car_confirm: {type: Boolean},
    essentials_current_car: [essential],
    essentials_current_sender: [essential],
    //nhu yếu phẩm car nhận từ sender
    essentials: [essential]
},{
    timestamps: true
})

module.exports = mongoose.model('History_sender', History_sender);