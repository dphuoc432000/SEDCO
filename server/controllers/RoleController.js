const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose.js');
const Role = require('../models/Role.js');
const handleOther = require('./handleOther.js');
const roleService = require("../service/RoleService");
const UserService = require('../service/UserService.js');

class RoleController{
    //[POST] /roles/store
    addRole = async (req, res, next) =>{
        await roleService.addRole(req.body)
            .then(role=>{
                res.json(role)
            })
            .catch(error=>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error));
            })
    }
    
    //[GET] /roles/role_list
    getAllRole = async (req, res, next) => {
        await roleService.getRoleList()
            .then(roles =>{
                res.json(roles);
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi", error)); 
            })
    }

    //[GET] /roles/details/:id
    getRoleByID = async  (req, res, next) =>{
        await roleService.getRoleByID(req.params.id)
            .then((role)=>{
                res.json(role);
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập role_id", error)); 
            })
    }

    //[POST] /roles/update/:id
    updateRole = async(req, res, next) => {
        await roleService.updateRole(req.params.id, req.body)
            .then((role)=>{
                res.json(role);
            })
            .catch(error => {
                res.status(400).json(handleOther.errorHandling('Lỗi nhập role_id', error));
            })
    }
    
    //[POST] /role/delete/:id
    deleteRole = async(req, res, next) =>{
        await roleService.deleteRole(req.params.id)
            .then( role =>{
                res.json(role);
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập role_id", error));
            })
    }
}

module.exports = new RoleController();