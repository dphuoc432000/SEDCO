const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");
const handleOther = require("./handleOther");
class AuthenticationController {
    //[POST]
    login = async (req, res, next) =>{
        var username = req.body.username;
        var password = req.body.password;

        await accountService.getAccountByUsernameAndBPassword(username, password)
            .then(data => {
                if(data){
                    const token = jwt.sign({_id: data._id}, "mk");
                    res.cookie("account_cookie", token, {expires: new Date(Date.now() + 8 * 3600000)})
                    // console.log(token);
                    return res.json(token);
                }
                return res.status(500).json(handleOther.errorHandling("Lỗi nhập username hoặc password",null));
            })
            .catch(err => next(err))
    }

    register = async (req, res, next) =>{
        await accountService.addUserAccount(req.body)
            .then(data =>{
                if(data)
                    return res.json(data);
                return res.status(400).json("Lỗi trùng username");
            })
            .catch(err => next(err))
    }

    logout = async(req, res, next) =>{
        res.clearCookie('account_cookie');
        return res.json("Đã logout");
    }
}

module.exports = new AuthenticationController;