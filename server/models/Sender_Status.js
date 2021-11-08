const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var essential = new Schema({
    essential_id: {type: Schema.Types.ObjectId, required: true, ref: 'Essential'},
    quantity: {type: Number}
}, {
    timestamps: true,
    _id: false
} )

const Sender_status = new Schema({
    status_id: {type: Schema.Types.ObjectId, ref:"Status", required: true},
    note: {type: String},
    picture: {type: String, },
    weight_essential: {type: Number},
    regis_status:{type: Boolean},//đã có xe đăng ký chưa
    essentials: [essential]
},{
    timestamps: true
})
Sender_status.index({"status_id":1}, {unique: true});

module.exports = mongoose.model('Sender_status', Sender_status);