const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Receive_Status_Detail = new Schema({
    receive_status_id: {type: Schema.Types.ObjectId, ref: "Receiver_status" ,require: true},
    esential_id: {type: Schema.Types.ObjectId, ref: "Essential" ,require: true},
    quantity: {type: Number, require: true}
},{
    timestamps: true
})

module.exports = mongoose.Model('Receive_Status_Detail', Receive_Status_Detail);
