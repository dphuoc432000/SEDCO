const Role = require("../models/Role");
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js")

class RoleService{

    getRoleList = async () =>{
        return await Role.find({}) // return về promise
            .then(roles =>{
                return multiplemongooseToObject(roles);  //return về data promise
            })
    }

    getRoleByID = async (id) =>{
        return await Role.findById({_id: id})
            .then(role =>{
                return mongooseToObject(role);
            })
    }
    
    getRoleByName= async (role_name_param) =>{
        return await Role.findOne({role_name: role_name_param})
            .then(role =>{
                return mongooseToObject(role);
            })
    }

    addRole = async(object) =>{
        const role = new Role(object);
        return await role.save()
            .then(role =>{
                return mongooseToObject(role);
            })
    }

    updateRole = async(id, object) =>{
        return await Role.findByIdAndUpdate({_id: id}, object)
            .then(role =>{
                return mongooseToObject(role);
            })
    }

    deleteRole = async(id) =>{
        return await Role.findByIdAndRemove({_id: id})
            .then(role =>{
                return mongooseToObject(role);
            })
    }
    
}

module.exports = new RoleService();