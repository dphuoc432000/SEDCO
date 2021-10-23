const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vehicle_censorship = new Schema({
    face_img: {type: String},
    id_card_img_before: {type: String},
    id_card_img_after: {type: String},
    driving_license_img_before: {type: String},
    driving_license_img_after: {type: String},
    test_img_1: {type: String},
    test_img_2: {type: String},
    user_id: {type: Schema.Types.ObjectId, required: true, ref:"User"}
}, {
    timestamps: true
})

Vehicle_censorship.index({"user_id":1}, {unique: true});
module.exports = mongoose.model("Vehicle_censorship", Vehicle_censorship)