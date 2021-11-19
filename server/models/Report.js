const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Report = new Schema({
    status_id: {type: Schema.Types.ObjectId, ref: 'Status', required: true},
    account_id: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    description: {type: String},
}, {
    timestamps:true
});

module.exports = mongoose.model('Report', Report);
