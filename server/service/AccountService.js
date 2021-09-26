const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const Account = require('../models/Account');
const userService = require('./UserService');
const roleService = require('./RoleService');
const handleOther = require('../controllers/handleOther');
class AccountService{
    addAccount = async(user_id_param, role_id_param, object)=>{
        const user_objectId = await userService.getUserByID(user_id_param)
                        .then(user => user._id)
                        .catch(()=>null);
        const role_objectId = await roleService.getRoleByID(role_id_param)
                        .then(role => role._id)
                        .catch(()=>null);
        
        if(user_objectId && role_objectId){
            object.user_id = user_id_param;
            object.role_id = role_id_param;
            
            //xử lý request username trùng tên đã có
            Account.findOne({username: object.username})
                .then(() => {object.username = ""});

            const account = new Account(object);
            return await account.save()
                .then(data => mongooseToObject(data));
        }
        else
            return null;
    }

    getAccountList = async()=>{
        return await Account.find({})
            .then(accounts => multiplemongooseToObject(accounts));
    }

    getAccountDetails = async(id)=>{
        return await Account.findById({_id:id})
            .then(account => account);
    }

    accountUpdate = async(id, object)=>{
        const checkRole = await roleService.getRoleByID(object.role_id)
            .then(role => role?true:false);
        if(checkRole)
            return await Account.findByIdAndUpdate({_id: id}, object)
                .then(acount => mongooseToObject(acount));
        else
            return null;
    }

    accountUpdate_roleId_byRoleName = async(id, role_name) =>{
        const role = await roleService.getRoleByName(role_name);
        return await this.accountUpdate(id, {role_id: role._id})
            .then((account) => (account));
    }

    deleteAccount = async(id) =>{
        return await Account.findByIdAndRemove({_id: id})
            .then(account => mongooseToObject(account))
    }

    getAccountByUsernameAndBPassword = async(username_param, password_param) =>{
        return await Account.findOne({username: username_param, password: password_param})
            .then(account => mongooseToObject(account));
    }
}

module.exports = new AccountService();