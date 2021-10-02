const {multiplemongooseToObject, mongooseToObject} = require('../util/mongoose');
const Account = require('../models/Account');
const User = require('../models/User');
const userService = require('./UserService');
const roleService = require('./RoleService');
const handleOther = require('../controllers/handleOther');
class AccountService{
    addAccount = async(user_id_param, role_id_param, object)=>{
        const user_objectId = await userService.getUserByID(user_id_param)
                        .then(user => user._id)
                        // .catch(()=>null); đổi sang catch err dùng thử
                        .catch(err => err);
        const role_objectId = await roleService.getRoleByID(role_id_param)
                        .then(role => role._id)
                        // .catch(()=>null); đổi sang catch err dùng thử
                        .catch(err => err);
        
        if(user_objectId && role_objectId){
            object.user_id = user_id_param;
            object.role_id = role_id_param;
            
            //xử lý request username trùng tên đã có
            Account.findOne({username: object.username})
                .then(() => {object.username = ""}) // thêm cacth nếu lỗi chạy không được thì bỏ. Đã chạy được không cần catch
                .catch(err => err);;

            const account = new Account(object);
            return await account.save()
                .then(data => mongooseToObject(data))// thêm cacth nếu lỗi chạy không thì bỏ. Đã chạy được không cần catch
                .catch(err => err);
        }
        else
            return null;
    }
    check_username_exists = async (username_param) =>{
        return await Account.findOne({username: username_param})
            .then(data => data?true:false)
            .catch(err => err);
    }
    addUserAccount = async (object) =>{
        if(await this.check_username_exists(object.username)===false){
            const form_user_data = {
                full_name: object.full_name,
                age: object.age,
                phone_number: object.phone_number,
                email: object.email,
                city: object.city,
                district: object.district,
                address: object.address
            };
            const user = new User(form_user_data);
            const user_data = await user.save()
                .then((data)=>  mongooseToObject(data))
                .catch((err)=> err);
            const form_account = {
                username: object.username,
                password: object.password,
                user_id: user_data._id,
                role_id: await roleService.getRoleByName("user")
                    .then(data => data._id) // thêm catch nếu chạy lỗi thì bỏ
                    .catch(err => err)
            }

            const account = new Account(form_account);
            return await account.save()
                .then(data =>{
                    const account_data = mongooseToObject(data)
                    account_data.user = {...user_data};
                    return account_data;
                })
                .catch(err => err);
        }
        return null;
    }
    getAccountList = async()=>{
        return await Account.find({})
            .then(accounts => multiplemongooseToObject(accounts))// thêm catch nếu chạy lỗi thì bỏ
            .catch(err => err);
    }

    getAccountDetails = async(id)=>{
        return await Account.findById({_id:id})
            .then(account => account)
            .catch(err => err);
    }

    accountUpdate = async(id, object)=>{
        const checkRole = await roleService.getRoleByID(object.role_id)
            .then(role => role?true:false)// thêm catch nếu chạy lỗi thì bỏ
            .catch(err => err);
        if(checkRole)
            return await Account.findByIdAndUpdate({_id: id}, object)
                .then(acount => mongooseToObject(acount))// thêm catch nếu chạy lỗi thì bỏ
                .catch(err => err);
        else
            return null;
    }

    accountUpdate_roleId_byRoleName = async(id, role_name) =>{
        const role = await roleService.getRoleByName(role_name);
        return await this.accountUpdate(id, {role_id: role._id})
            .then((account) => (account))// thêm catch nếu chạy lỗi thì bỏ
            .catch(err => err);
    }

    deleteAccount = async(id) =>{
        return await Account.findByIdAndRemove({_id: id})
            .then(account => mongooseToObject(account))// thêm catch nếu chạy lỗi thì bỏ
            .catch(err => err);
    }

    getAccountByUsernameAndBPassword = async(username_param, password_param) =>{
        return await Account.findOne({username: username_param, password: password_param})
            .then(account => {
                if(account)
                    return mongooseToObject(account);
                return account
            })// thêm catch nếu chạy lỗi thì bỏ
            .catch(err => err);
    }
}

module.exports = new AccountService();