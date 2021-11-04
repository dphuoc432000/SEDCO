
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

    getPathAllImageCar = (req, res, next) =>{
        const files = req.files;
        console.log(files)
        const face_img =  files.face_img;
        const id_card_img_before = files.id_card_img_before;
        const id_card_img_after = files.id_card_img_after;
        const driving_license_img_before = files.driving_license_img_before;
        const driving_license_img_after = files.driving_license_img_after;
        const test_img_1 = files.test_img_1;
        const test_img_2 = files.test_img_2;
        // if(typeof face_img != 'undefined' &&  typeof id_card_img_before != 'undefined' &&  typeof id_card_img_after != 'undefined' 
        //     && typeof driving_license_img_before != 'undefined'&& typeof driving_license_img_after != 'undefined'&& typeof test_img_1 != 'undefined'
        // ){
            const object = {
                face_img : typeof face_img != 'undefined'?face_img[0].path:'',
                id_card_img_before : typeof id_card_img_before != 'undefined'?id_card_img_before[0].path:'',
                id_card_img_after : typeof id_card_img_after != 'undefined'?id_card_img_after[0].path:'',
                driving_license_img_before :typeof driving_license_img_before != 'undefined' ? driving_license_img_before[0].path:'',
                driving_license_img_after : typeof driving_license_img_after != 'undefined'? driving_license_img_after[0].path:'',
                test_img_1 : typeof test_img_1 != 'undefined'? test_img_1[0].path:'',
                test_img_2 : typeof test_img_2 != 'undefined'?test_img_2[0].path:""
            }
            // if(typeof test_img_2 != 'undefined')
            //     object.test_img_2 = test_img_2[0].path?test_img_2[0].path:"";
            return object
        // }
        // return null;
    }

    //[POST] /users/update/:id
    updateUser = async(req, res, next) =>{
        const pathImages = this.getPathAllImageCar(req, res, next);
        let form_data = {
            ...req.body,
            file_images: {}
        }
        if(pathImages){
            form_data.file_images = {...pathImages}
        }
        await userService.updateUserInfor(req.params.id, form_data)
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