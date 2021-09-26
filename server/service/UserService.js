const User = require("../models/User");
const {multiplemongooseToObject, mongooseToObject} = require("../util/mongoose.js")

class UserService{

    getUserList = async () =>{
        return await User.find({}) // return về promise
            .then(users =>{
                return multiplemongooseToObject(users);  //return về data promise
            })
    }

    getUserByID = async (id) =>{
        return await User.findById({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
    }

    addUser = async(object) =>{
        const user = new User(object);
        return await user.save()
            .then(user =>{
                return mongooseToObject(user);
            })
    }

    updateUser = async(id, object) =>{
        return await User.findByIdAndUpdate({_id: id}, object)
            .then(user =>{
                return mongooseToObject(user);
            })
    }

    deleteUser = async(id) =>{
        return await User.findByIdAndRemove({_id: id})
            .then(user =>{
                return mongooseToObject(user);
            })
    }
}

module.exports = new UserService();