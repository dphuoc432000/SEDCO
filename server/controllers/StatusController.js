const {multiplemongooseToObject,mogooseToObject, mongooseToObject} = require('../util/mongoose');
const Status = require('../models/Status.js');
const handleOther = require('./handleOther.js');
const Account = require('../models/Account.js');
const statusService = require('../service/StatusService');
const accountService = require('../service/AccountService');
// const upload = require('../middlewares/upload');
const multer = require('multer');
const pagination = require("../middlewares/pagination");
const path = require('path');


class StatusController{

    //[POST] /status/store/:account_id_pr
    addStatus = async (req, res, next) =>{
        const start_receive_time = Date.parse(req.body.start_receive_time);
        const departure_time = Date.parse(req.body.departure_time);
        const date = new Date();
        const current_date = date.getDate();
        const current_month = date.getMonth() + 1;
        const current_year = date.getFullYear();
        const current_time = Date.parse(`${current_year}-${current_month}-${current_date}`);

        if((current_time > departure_time || current_time> start_receive_time))
            return res.status(400).json(handleOther.errorHandling("Lỗi ngày nhận nhu yếu phẩm hoặc ngày khởi hành đang nhỏ hơn ngày hiện tại!", null))
        if((departure_time - start_receive_time < 0))
            return res.status(400).json(handleOther.errorHandling("Lỗi ngày khởi hành đang nhỏ hơn ngày nhận hàng hóa!", null))
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        // console.log(req.body)
        await statusService.addStatus(req.params.account_id_pr, req.params.status_type_pr, form_data)
            .then(async status => {
                if(status && Object.keys(status.detail).length > 0)
                    return res.json(status);
                else if(status && Object.keys(status.detail).length === 0 && status.constructor === Object) {
                    await Status.findByIdAndRemove({_id: status._id})
                        .catch(err => res.status(400).json("Lỗi xóa status"));
                    await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user')
                        .catch(err => res.status(400).json("chuyển account role về user"));
                    return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu con", null))
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(error => next(error));
    }
    getPathAllImageCar = (req, res, next) =>{
        const files = req.files;
        const face_img = files.face_img;
        const id_card_img_before = files.id_card_img_before;
        const id_card_img_after = files.id_card_img_after;
        const driving_license_img_before = files.driving_license_img_before;
        const driving_license_img_after = files.driving_license_img_after;
        const test_img_1 = files.test_img_1;
        const test_img_2 = files.test_img_2;
        if(typeof face_img != 'undefined' &&  typeof id_card_img_before != 'undefined' &&  typeof id_card_img_after != 'undefined' 
            && typeof driving_license_img_before != 'undefined'&& typeof driving_license_img_after != 'undefined'&& typeof test_img_1 != 'undefined'
        ){
            const object = {
                face_img : face_img[0].path,
                id_card_img_before : id_card_img_before[0].path,
                id_card_img_after : id_card_img_after[0].path,
                driving_license_img_before : driving_license_img_before[0].path,
                driving_license_img_after : driving_license_img_after[0].path,
                test_img_1 : test_img_1[0].path,
            }
            if(typeof test_img_2 != 'undefined')
                object.test_img_2 = test_img_2[0].path?test_img_2[0].path:"";
            return object
        }
        return null;
    }
    addStatusCar = async(req, res, next) =>{

        const pictureFile = req.files.picture;
        let picture="";
        if(typeof pictureFile  != 'undefined')
            picture = pictureFile[0].path?pictureFile[0].path:"";
            console.log(picture);
        const pathImages = this.getPathAllImageCar(req, res, next);
        if(pathImages){
            const form_data ={
                ...req.body,
                file_images: {...pathImages},
                picture: picture
            }
            return await statusService.addStatusCarTrip(req.params.account_id_pr, form_data)
                .then(async status => {
                    if(status && Object.keys(status.detail).length > 0)
                        return res.json(status);
                    else if(status && Object.keys(status.detail).length === 0 && status.constructor === Object) {
                        await Status.findByIdAndRemove({_id: status._id})
                            .catch(err => res.status(400).json("Lỗi xóa status"));
                        await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user')
                            .catch(err => res.status(400).json("chuyển account role về user"));
                        return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu con", null))
                    }
                    return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
                }) 
                .catch(error => next(error));
            // console.log(form_data)
        }
        else
            return res.status(400).json(handleOther.errorHandling("Lỗi nhập hình ảnh", null))
    }
    //[POST] /status/store/:account_id_pr
    addStatusReceiver = async(req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        await statusService.addStatusReceiver(req.params.account_id_pr, form_data)
            .then(async status => {
                if(status && Object.keys(status.detail).length > 0)
                    return res.json(status);
                else if(status && Object.keys(status.detail).length === 0 && status.constructor === Object) {
                    await Status.findByIdAndRemove({_id: status._id})
                        .catch(err => res.status(400).json("Lỗi xóa status"));
                    await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user')
                        .catch(err => res.status(400).json("chuyển account role về user"));
                    return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu con", null))
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(error => next(error));
    }

    addStatusSender= async(req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        await statusService.addStatusSender(req.params.account_id_pr, form_data)
            .then(async status => {
                if(status && Object.keys(status.detail).length > 0)
                    return res.json(status);
                else if(status && Object.keys(status.detail).length === 0 && status.constructor === Object) {
                    await Status.findByIdAndRemove({_id: status._id})
                        .catch(err => res.status(400).json("Lỗi xóa status"));
                    await accountService.accountUpdate_roleId_byRoleName(status.account_id, 'user')
                        .catch(err => res.status(400).json("chuyển account role về user"));
                    return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu con", null))
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", null))
            })
            .catch(error => next(error));
    }
    
    //[GET] /status/status_list
    getAllStatus = async (req, res, next) => {
        await statusService.getStatusList()
            .then((status) => {
                if(status){
                    // console.log(req.query._limit, req.query._page)
                    const datas = pagination(status, req.query._limit, req.query._page);
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi", null)); 
            })
            .catch(error => next(error));
    }
    //[GET] /status_list/:status_type_pr
    getAllStatusByType = async(req, res, next)=>{
        await statusService.getStatusListByType(req.params.status_type_pr)
            .then((status) => {
                if(status){
                    const datas = pagination(status, req.query._limit, req.query._page)
                    return res.json(datas);
                }
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status type", null)); 
            })
            .catch(error => next(error));
    }
    //[GET] /status/details/:status_id
    getStatusByID = async  (req, res, next) =>{
        /*statusService.getEssentialOfStatus(req.params.status_id);*/
        // console.log(req.params.status_id)
        await statusService.getStatusDetail(req.params.status_id)
            .then(status => {
                if(status)
                    return res.json(status);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", null));
            })
            .catch(error => next(error));
    }

    //[POST] /status/update/:status_id_pr
    updateStatus = async(req, res, next) =>{
        await statusService.updateStatus(req.params.status_id_pr, req.body)
            .then(status => {
                if(status)
                    return res.json(status);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", null));
            })
            .catch(err => next(err))
    }
    
    //[POST] /status/:status_id_pr/delete
    deleteStatus = async(req, res, next) =>{
        await statusService.deleteStatus(req.params.status_id_pr)
            .then(status => {
                if(status)
                    return res.json(status)
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập không đúng status_id", null));
            })
            .catch(err => next(err))
    }

    getEssentialOfStatus = async(req, res, next) =>{
    }
    
    //Lấy về chi tiết status account chưa hoàn thành
    getStatusDetailByAccountID = async (req, res, next)=>{
        await statusService.getStatusDetailByAccountID(req.params.account_id_pr)
            .then(status => {
                if(status && status !== 'NO PERMISSION')
                    return res.json(status);
                else if(status === 'NO PERMISSION')
                    return res.status(400).json(handleOther.errorHandling("Bạn là người dùng nên không có quyền truy cập status chi tiết", null));
                else
                    return res.status(400).json(handleOther.errorHandling("account_id không chính xác", null));
            })
            .catch(error => next(error));
    }
}

module.exports = new StatusController();