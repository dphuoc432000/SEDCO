const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');
const Role = require('../models/Role.js');
const handleOther = require('./handleOther.js');
const roleService = require("../service/RoleService");
const UserService = require('../service/UserService.js');
const pagination = require("../middlewares/pagination");

class RoleController{
    //[POST] /roles/store
    addRole = async (req, res, next) =>{
        await roleService.addRole(req.body)
            .then(role=>{
                if(role)
                    return res.json(role);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null));
            })
            .catch(err => next(err));
    }
    
    //[GET] /roles/role_list
    getAllRole = async (req, res, next) => {
        await roleService.getRoleList()
            .then(roles =>{
                if(roles){
                    const datas = pagination(roles, req.query._limit, req.query._page);
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi", null));
            })
            .catch(err => next(err));
    }

    //[GET] /roles/details/:id
    getRoleByID = async  (req, res, next) =>{
        await roleService.getRoleByID(req.params.id)
            .then(role=>{
                if(role)
                    return res.json(role);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập role_id", null));
            })
            .catch(err => next(err));
    }

    //[POST] /roles/update/:id
    updateRole = async(req, res, next) => {
        await roleService.updateRole(req.params.id, req.body)
        .then(role=>{
            if(role)
                return res.json(role);
            return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null));
        })
        .catch(err => next(err));
    }
    
    //[POST] /role/delete/:id
    deleteRole = async(req, res, next) =>{
        await roleService.deleteRole(req.params.id)
            .then(role=>{
                if(role)
                    return res.json(role);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập role_id", null));
            })
            .catch(err => next(err));
    }
    getRoleByAccountID = async(req, res, next) =>{
        await roleService.getRoleByAccountID(req.params.account_id_pr)
            .then(account=>{
                if(account)
                    return res.json(account);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập account_id", null));
            })
            .catch(err => next(err));
    }
}

module.exports = new RoleController();