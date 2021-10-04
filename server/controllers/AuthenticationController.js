const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");
const handleOther = require("./handleOther");
const Refresh_Token = require('../models/Refresh_Token');
const Role = require('../models/Role');
const Account = require('../models/Account');
const bcrypt = require("bcryptjs");
const config_auth = require("../config/auth.config")

class AuthenticationController {
    signin = async (req, res) => {
        await Account.findOne({username: req.body.username})
            .then(async (account) =>{
                if (!account) {
                    return res.status(404).json({ message: "Account Not found." });
                }
                //chưa mã hóa password nên chưa được dùng hàm dưới
                // let passwordIsValid = bcrypt.compareSync(req.body.password, account.password);

                // if (!passwordIsValid) {
                if(account.password !== req.body.password){
                    return res.status(401).json({
                        accessToken: null,
                        message: "Invalid Password!",
                    });
                }
                let token = jwt.sign({_id: account._id }, config_auth.secret, {
                    expiresIn: config_auth.jwtExpiration,
                });

                let refresh_token = await Refresh_Token.createToken(account);
                console.log(refresh_token);

                // res.set('x-access-token', token);
                // console.log("header: ",req.headers)
                res.cookie("account_cookie", token, {expires:  new Date(Date.now() + 1 * 3600000)});

                return res.status(200).json({
                    _id: account._id,
                    username: account.username,
                    role_id: account.role_id,
                    accessToken: token,
                    refreshToken: refresh_token,
                });
            })
            .catch((err) => res.status(500).json({ message: err.message }));
    };

    refreshToken = async (req, res) => {
        // console.log(req.body);
        const { refreshToken: requestToken } = req.body;
        
        if (requestToken == null) {
            return res.status(403).json({ message: "Refresh Token is required!" });
        }
        
        try {
            let refreshToken = await Refresh_Token.findOne({ token: requestToken });
            // console.log(refreshToken);
            if (!refreshToken) {
                return res.status(403).json({ message: "Refresh token is not in database!" });
            }
            // console.log(Refresh_Token.verifyExpiration(refreshToken))
        
            if (Refresh_Token.verifyExpiration(refreshToken)) {
                Refresh_Token.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
                
                return res.status(403).json({
                    message: "Refresh token was expired. Please make a new signin request",
                });
            }
        
            let newAccessToken = jwt.sign({ id: refreshToken._id }, config_auth.secret, {
                expiresIn: config_auth.jwtExpiration,
            });
            
            // console.log(newAccessToken);

            return res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: refreshToken.token,
            });
        } 
        catch (err) {
            return res.status(500).json({ message: err });
        }
    };

    //[POST]
    login = async (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;

        await accountService.getAccountByUsernameAndBPassword(username, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({ _id: data._id }, "mk");
                    res.cookie("account_cookie", token, {
                        expires: new Date(Date.now() + 8 * 3600000),
                    });
                    // console.log(token);
                    return res.json(token);
                }
                return res.status(500).json(handleOther.errorHandling("Lỗi nhập username hoặc password", null));
            })
            .catch((err) => next(err));
    };

    register = async (req, res, next) => {
        await accountService
        .addUserAccount(req.body)
        .then((data) => {
            if (data) return res.json(data);
            return res.status(400).json("Lỗi trùng username");
        })
        .catch((err) => next(err));
    };

    logout = async (req, res, next) => {
        res.clearCookie("account_cookie");
        return res.json("Đã logout");
    };
}

module.exports = new AuthenticationController;