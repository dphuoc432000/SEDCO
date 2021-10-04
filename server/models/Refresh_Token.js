const mongoose = require("mongoose");
const config_auth = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (account) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config_auth.jwtRefreshExpiration);

    let _token = uuidv4();

    let _object = new this({
        token: _token,
        account_id: account._id,
        expiryDate: expiredAt.getTime(),
    });

    // console.log("object:", _object);

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
    console.log('expiryDate: ', token.expiryDate.getTime());
    console.log('time: ', new Date().getTime());
    return token.expiryDate.getTime() < new Date().getTime();
};

module.exports = mongoose.model("Refresh_Token", RefreshTokenSchema);
