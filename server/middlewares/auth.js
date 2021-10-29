const jwt = require("jsonwebtoken");
const accountService = require("../service/AccountService");
const roleService = require("../service/RoleService");
const config_auth = require('../config/auth.config');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const {TokenExpiredError} = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res
        .status(401)
        .json({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).json({ message: "Unauthorized!" });
};

const verifyToken = async (req, res, next) => {
    const token = req.cookies.account_cookie;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    const account_id = jwt.verify(token, config_auth.secret);
        // console.log(account_id); ==> { _id: '614c8b99f18a19a3af1ed670', iat: 1632411630 }
    await accountService.getAccountDetails(account_id._id)
        .then(data => {
            if(data){
                req.data = data; //data: account
                console.log(data);
                next();
            }
            else
                res.json("NOT PERMISSION");
        })
        .catch(err =>{
            catchError(err, res);
        })
};


//[GET]
const check_login = async (req, res, next) =>{
    try {
        const token = req.cookies.account_cookie;
        const tokenlocalstorage = localStorage.getItem('accessToken');
        // console.log(tokenlocalstorage)
      
        // const account_id = jwt.verify(token,'mk');
        const account_id = jwt.verify(tokenlocalstorage,'mk');
        // console.log(account_id); ==> { _id: '614c8b99f18a19a3af1ed670', iat: 1632411630 }
        await accountService.getAccountDetails(account_id._id)
            .then(data => {
                if(data){
                    req.data = data; //data: account
                    next();
                }
                else
                    res.json("NOT PERMISSION")
            })
            .catch(err =>{
                res.json(err.message);
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

const check_user_create_status = async(req, res, next) => {
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


const checkRole = (roles = []) =>{
    if(typeof roles === 'string')
        roles = [roles];
    return [ async (req, res, next) =>{
        const account = req.data;
        const role_name = await roleService.getRoleByID(account.role_id)
            .then(data => data.role_name)
            .catch(err => err);
        
        console.log(role_name)
        if(roles.length && !roles.includes(role_name)){
            return res.status(401).json({message: "NOT PERMISSION"});
        }
        next();
    }];
}

const getAccIDByReqData = (req, res, next) => req.data._id; //account._id

module.exports = {check_login, check_sender, check_user_create_status, check_receiver, getAccIDByReqData, checkRole, verifyToken};
