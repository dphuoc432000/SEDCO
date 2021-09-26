const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");
const roleService = require("../service/RoleService");


//[GET]
const check_login = async (req, res, next) =>{
    try {
        const token = req.cookies.account_cookie;
        
        const account_id = jwt.verify(token,'mk');
        // console.log(account_id); ==> { _id: '614c8b99f18a19a3af1ed670', iat: 1632411630 }
        accountService.getAccountDetails(account_id._id)
            .then(data => {
                if(data){
                    req.data = data; //data: account
                    next();
                }
                else
                    res.json("NOT PERMISSION")
            })
            .catch(err =>{

            })
    } catch (error) {
        res.status(500).json('ma token khong hop le')
    }
}

const check_sender = async(req, res, next) => {
    const role_name = await roleService.getRoleByID(req.data.role_id)
        .then((data) => data.role_name)
    if(role_name === 'sender')
        next();
    else
        res.json("NOT PERMISSION")
}

const check_user = async(req, res, next) => {
    console.log('user')
    const role_name = await roleService.getRoleByID(req.data.role_id)
        .then((data) => data.role_name)
    if(role_name === 'user'){
        console.log('đã login user')
        next();
    }
    else
        res.json("NOT PERMISSION");
}

const check_receiver = async(req, res, next) => {
    console.log('receiver')
    const role_name = await roleService.getRoleByID(req.data.role_id)
        .then((data) => data.role_name)
    if(role_name === 'receiver'){
        console.log('đã login receiver')
        next();
    }
    else
        res.json("NOT PERMISSION");
}

const getAccIDByReqData = (req, res, next) => req.data._id; //account._id

module.exports = {check_login, check_sender, check_user, check_receiver, getAccIDByReqData};
