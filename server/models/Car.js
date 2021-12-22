const mongoose = require('mongoose');
const Schema = mongoose.Schema
require('mongoose-double')(mongoose);

const car = new Schema({
    license_plate: {type: String, required: true},
    type_car: {type:String, required: true},
    tonnage: {type: mongoose.Schema.Types.Double},
    many_people: {type: Number},
    user_id: {type: Schema.Types.ObjectId, required: true, ref:"User"}
}, {
    timestamps: true,
} )

module.exports = mongoose.model("Car", car)