const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");

class AuthenticationController {
    //[POST]
    login = async (req, res, next) =>{
        var username = req.body.username;
        var password = req.body.password;

        await accountService.getAccountByUsernameAndBPassword(username, password)
            .then(data => {
                const token = jwt.sign({_id: data._id}, "mk");
                res.cookie("account_cookie", token, {expires: new Date(Date.now() + 8 * 3600000)})
                // console.log(token);
                res.json(token);
            })
            .catch((error) => {
                res.status(500).json(error.message);
            })
    }
}

module.exports = new AuthenticationController;