const User = require("../models/User");
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js")

class UserService{

    getUserList = async () =>{
        return await User.find({}) // return về promise
            .then(users =>{
                return multiplemongooseToObject(users);  //return về data promise
            })
            .catch(err => err);
    }

    getUserByID = async (id) =>{
        return await User.findById({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    addUser = async(object) =>{
        const user = new User(object);
        return await user.save()
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    updateUser = async(id, object) =>{
        return await User.findByIdAndUpdate({_id: id}, object)
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    deleteUser = async(id) =>{
        return await User.findByIdAndRemove({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
            .catch(err => err);
    }

    getUserDetailByEmail = async(email_param) =>{
        return await User.findOne({email: email_param})
            .then(user => mongooseToObject(user))
            .catch(err=>err);
    }
}

module.exports = new UserService();