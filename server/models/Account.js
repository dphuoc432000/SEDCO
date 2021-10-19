const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const Account = new Schema({
    username: {type: String, maxlength: 256, required: true, unique: true},
    password: {type: String, maxlength: 256, required:true},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', unique: true},
    role_id: {type: Schema.Types.ObjectId, ref: 'Role'}
},{
    timestamps: true
})
Account.index({"username":1, "user_id":1}, {unique: true});
module.exports = mongoose.model('Account', Account);