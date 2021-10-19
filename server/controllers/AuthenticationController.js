const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");
const handleOther = require("./handleOther");
const Refresh_Token = require('../models/Refresh_Token');
const Role = require('../models/Role');
const Account = require('../models/Account');
const bcrypt = require("bcryptjs");
const config_auth = require("../config/auth.config")
const nodemailer = require("nodemailer");
const mailer_config = require("../config/mailer.config");
const UserService = require("../service/UserService");
const AccountService = require("../service/AccountService");

class AuthenticationController {
    signin = async (req, res) => {
        await Account.findOne({username: req.body.username})
            .then(async (account) =>{
                if (!account) {
                    return res.status(404).json({ message: "Account Not found." });
                }
                //chưa mã hóa password nên chưa được dùng hàm dưới
                let passwordIsValid = bcrypt.compareSync(req.body.password, account.password);

                if (!passwordIsValid) {
                // if(account.password !== req.body.password){
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
            return res.status(400).json("Lỗi trùng tên đăng nhập hoặc số điện thoại hoặc email");
        })
        .catch((err) => next(err));
    };

    logout = async (req, res, next) => {
        res.clearCookie("account_cookie");
        return res.json("Đã logout");
    };

    forgotPassword = async (req, res, next) => {
        return await UserService.getUserDetailByEmail(req.body.email)
        .then(async(user) =>{
            if(user){
                let transporter = nodemailer.createTransport({
                    host: mailer_config.MAILER_HOST,
                    port: mailer_config.MAILER_PORT,
                    secure: mailer_config.MAILER_SECURE, // true for 465, false for other ports
                    auth: {
                      user: mailer_config.SEDCO_USERNAME, // generated ethereal user
                      pass: mailer_config.SEDCO_PASSWORD, // generated ethereal password
                    },
                });
                const account = await AccountService.getAccountByUserID(user._id);
                // console.log(transporter)
                  // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: mailer_config.SEDCO_USERNAME, // sender address
                    to: user.email, // list of receivers
                    subject: `SEDCO - Khôi phục mật khẩu`, // Subject line
                    html: `
                    Chào ${user.full_name},
                    <p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu tài khoản từ bạn.</p>
                    <span><nobr>Tên đăng nhập: <h4>${account.username}</h4></nobr></span>
                    <span><nobr>Mật khẩu: <h4>${account.password}</h4></nobr><span>
                    <br>
                    <p>Vui lòng cập nhật lại mật khẩu của bạn. Để tiện trong quá trình đăng nhập lại.</p>
                    <p><strong>Để cập nhập mật khẩu cần: </strong> <a href="http://localhost:5000"/> đăng nhập với mật khẩu trên. Vào menu. Thông tin cá nhân, đổi mật khẩu.</p>
                    <p>Cảm ơn bạn vì đã sử dụng hệ thống. Chúc bạn sức khỏe!</p>
                    `, // html body
                })
                .then(data => data)
                .catch(err => err);
                return res.json({message: `Message sent: ${info.messageId}`});
            }
            return res.status(400).json("Người dùng chưa đăng ký");
        })
        .catch(err=>{
            next(err)
        })
        
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
      
}

module.exports = new AuthenticationController;