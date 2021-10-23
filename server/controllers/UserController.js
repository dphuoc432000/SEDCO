
const pagination = require("../middlewares/pagination");
const handleOther = require('./handleOther.js');
const userService = require('../service/UserService')
class UserController{

    //[POST] /users/store
    // addUser = async (req, res, next) =>{
    //     await userService.addUser(req.body)
    //         .then(user=>{
    //             res.json(user)
    //         })
    //         .catch(error =>{
    //             res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error));
    //         })
    // }
    

    //[GET] /users/user_list
    getAllUser = async (req, res, next) => {
        await userService.getUserList()
            .then(users =>{
                if(users)
                    return res.json(users);
                return res.status(400).json(handleOther.errorHandling("Lỗi", null)); 
            })
            .catch(error => next(error))
    }

    //[GET] /users/details/:id
    getUserByID = async  (req, res, next) =>{
        await userService.getUserByID(req.params.id)
            .then((user) =>{
                if(user)
                    return res.json(user);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", null)); 
            })
            .catch(error => next(error));
    }

    //[POST] /users/update/:id
    updateUser = async(req, res, next) =>{
        await userService.updateUser(req.params.id, req.body)
            .then((user) =>{
                if(user)
                    return res.json(user);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", null)); 
            })
            .catch(error => next(error));
    }
    
    //[POST] /users/delete/:id
    deleteUser = async(req, res, next) =>{
        await userService.deleteUser(req.params.id)
            .then((user) =>{
                if(user)
                    return res.json(user);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", null)); 
            })
            .catch(error => next(error));
    }

    getUserDetailByEmail = async(req, res, next) =>{
        await userService.getUserDetailByEmail(req.body.email)
            .then(user =>{
                if(user)
                    return res.json(user);
                return res.status(400).json(handleOther.errorHandling("Người dùng chưa được đăng ký", null)); 
            })
            .catch(error => next(error))
    }

    getAllUserDriverNoCensorship = async(req, res, next) =>{
        await userService.getAllUserDriverNoCensorship()
            .then(users =>{
                if(users){
                    const datas = pagination(users, req.query._limit, req.query._page);
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi", null)); 
            })
            .catch(error => next(error))
    }
}

module.exports = new UserController();