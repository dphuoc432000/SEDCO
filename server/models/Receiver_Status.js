const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Receiver_Status = new Schema({
    status_id: {type: Schema.Types.ObjectId, ref:"Status", required: true},
    note: {type: String},
    picture: {type: String, },
    number_per_of_family: {type: Number, min: 1, max: 20}
},{
    timestamps: true
})
Receiver_Status.index({"status_id":1}, {unique: true});

module.exports = mongoose.model('Receiver_status', Receiver_Status);