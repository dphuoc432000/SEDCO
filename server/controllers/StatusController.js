const {multiplemongooseToObject,mogooseToObject, mongooseToObject} = require('../util/mongoose');
const Status = require('../models/Status.js');
const handleOther = require('./handleOther.js');
const Account = require('../models/Account.js');
const statusService = require('../service/StatusService');
// const upload = require('../middlewares/upload');
const multer = require('multer');
const pagination = require("../middlewares/pagination");
const path = require('path');


class StatusController{

    //[POST] /status/store/:account_id_pr
    addStatus = async (req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file.path;
        await statusService.addStatus(req.params.account_id_pr, req.params.status_type_pr, form_data)
            .then(status => {
                if(status)
                    return res.json(status);
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
        statusService.getStatusDetail(req.params.status_id)
            .then(status => {
                if(status)
                    return res.json(status);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", null));
            })
            .catch(error => next(error));
    }

    //[POST] /status/update/:status_id_pr
    updateStatus = async(req, res, next) =>{
        statusService.updateStatus(req.params.status_id_pr, req.body)
            .then(status => {
                if(status)
                    return res.json(status);
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", null));
            })
            .catch(err => next(err))
    }
    
    //[POST] /statuss/delete/:status_id_pr
    deleteStatus = async(req, res, next) =>{
        statusService.deleteStatus(req.params.status_id_pr)
            .then(status => {
                if(status)
                    return res.json(status)
                return res.status(400).json(handleOther.errorHandling("Lỗi nhập không đúng status_id", null));
            })
            .catch(err => next(err))
    }

    getEssentialOfStatus = async(req, res, next) =>{
    }

}

module.exports = new StatusController();