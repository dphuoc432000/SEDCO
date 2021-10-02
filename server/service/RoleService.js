const Role = require("../models/Role");
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js")

class RoleService{

    getRoleList = async () =>{
        return await Role.find({}) // return về promise
            .then(roles =>{
                return multiplemongooseToObject(roles);  //return về data promise
            })
            .catch(err => err);
    }

    getRoleByID = async (id) =>{
        return await Role.findById({_id: id})
            .then(role =>{
                return mongooseToObject(role);
            })
            .catch(err => err);
    }
    
    getRoleByName= async (role_name_param) =>{
        return await Role.findOne({role_name: role_name_param})
            .then(role =>{
                return mongooseToObject(role);
            })
            .catch(err => err);
    }

    addRole = async(object) =>{
        const role = new Role(object);
        return await role.save()
            .then(role =>{
                return mongooseToObject(role);
            })
            .catch(err => err);
    }

    updateRole = async(id, object) =>{
        return await Role.findByIdAndUpdate({_id: id}, object)
            .then(role =>{
                return mongooseToObject(role);
            })
            .catch(err => err);
    }

    deleteRole = async(id) =>{
        return await Role.findByIdAndRemove({_id: id})
            .then(role =>{
                return mongooseToObject(role);
            })
            .catch(err => err);
    }
    
}

module.exports = new RoleService();