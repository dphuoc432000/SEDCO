const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Essential = new Schema({
    name: {type: String, require: true},
    type: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('Essential', Essential);
