const {multiplemongooseToObject,mogooseToObject, mongooseToObject} = require('../util/mongoose');
const Status = require('../models/Status.js');
const handleOther = require('./handleOther.js');
const Account = require('../models/Account.js');
const statusService = require('../service/StatusService');
class StatusController{

    //[POST] /status/store/:account_id_pr
    addStatus = async (req, res, next) =>{
        await statusService.addStatus(req.params.account_id_pr, req.params.status_type_pr, req.body.status_completed)
            .then(status => res.json(status))
            .catch(error => res.status(400).json(handleOther.errorHandling("Lỗi nhập dữ liệu", error)));
    }
    
    //[GET] /status/status_list
    getAllStatus = async (req, res, next) => {
        await statusService.getStatusList()
            .then((status) => res.json(status))
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi", error)); 
            });
    }
    //[GET] /status_list/:status_type_pr
    getAllStatusByType = async(req, res, next)=>{
        await statusService.getStatusListByType(req.params.status_type_pr)
            .then((status) => res.json(status))
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi", error)); 
            });
    }
    //[GET] /status/details/:status_id
    getStatusByID = async  (req, res, next) =>{
        statusService.getStatusDetails(req.params.status_id)
            .then(status => res.json(status))
            .catch(error =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", error)); 
            })
    }

    //[POST] /status/update/:status_id_pr
    updateStatus = async(req, res, next) =>{
        statusService.updateStatus(req.params.status_id_pr, req.body)
            .then(status => res.json(status))
            .catch(err => {
                res.status(400).json(handleOther.errorHandling("Lỗi nhập status_id", err));
            })
    }
    
    //[POST] /statuss/delete/:status_id
    deleteStatus = async(req, res, next) =>{
        statusService.deleteStatus(req.params.status_id)
            .then(status => res.json(status))
            .catch(err =>{
                res.status(400).json(handleOther.errorHandling("Lỗi nhập không đúng status_id", err));
            })
    }

    

}

module.exports = new StatusController();