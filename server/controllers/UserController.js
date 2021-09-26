
const handleOther = require('./handleOther.js');
const userService = require('../service/UserService')
class UserController{

    //[POST] /users/store
    addUser = async (req, res, next) =>{
        await userService.addUser(req.body)
            .then(user=>{
                res.json(user)
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error));
            })
    }
    
    //[GET] /users/user_list
    getAllUser = async (req, res, next) => {
        await userService.getUserList()
            .then(users =>{
                res.json(users);
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi", error)); 
            })
    }

    //[GET] /users/details/:id
    getUserByID = async  (req, res, next) =>{
        await userService.getUserByID(req.params.id)
            .then((user) =>{
                res.json(user);
            })
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", error)); 
            });
    }

    //[POST] /users/update/:id
    updateUser = async(req, res, next) =>{
        await userService.updateUser(req.params.id, req.body)
            .then((user)=>{
                res.json(user);
            })
            .catch(err => {
                res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", err));
            })
    }
    
    //[POST] /users/delete/:id
    deleteUser = async(req, res, next) =>{
        await userService.deleteUser(req.params.id)
            .then((user)=>{
                res.json(user);
            })
            .catch(err =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập user_id", err));
            })
    }
}

module.exports = new UserController();