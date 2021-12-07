const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    conversation_id: {type: Schema.Types.ObjectId, ref: 'Conversation', required: true},
    account_id: {type: Schema.Types.ObjectId, ref: 'Account', require: true},
    text: {type: String},
    watched: {type: Boolean}
},{
    timestamps: true
})

module.exports = mongoose.model('Message', Message);