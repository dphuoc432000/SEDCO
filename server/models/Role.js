const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
    role_name: {type: String, maxlength: 20,required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', Role);
