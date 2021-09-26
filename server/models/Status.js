const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
    account_id: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    status_type: {type: String, enum: ['SENDER', 'RECEIVER', 'CAR TRIP']},
    status_completed: {type: Boolean, maxlength: 11, required: true}
}, {
    timestamps:true
});

module.exports = mongoose.model('Status', Status);
