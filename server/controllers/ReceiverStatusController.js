const receiverStatusService = require('../service/ReceiverStatusService')
const handleOther = require('./handleOther');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const multer = require('multer');

class RecriverStatusController{

    //[POST] /api/receiver/create_receiver_status
    addReceiverStatus = async (req, res, next)=>{
        const account_id = authMiddleware.getAccIDByReqData(req, res, next);
        const form_data = req.body;
        form_data.picture = req.file.path;
        receiverStatusService.addReceiverStatus(account_id, form_data)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi nhập', err)))
        // res.json(req.body);
    }

    //[POST] /api/receiver/delete_receiver_status/:receiver_status_id_pr
    deleteReceiverStatus = async(req, res, next) =>{
        await receiverStatusService.deleteReceiverStatus(req.params.receive_status_id_pr)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi nhập receive_status_id_pr', err)));
    }

    //[GET] /api/receiver/status_list
    getAllReceiverStatusList = async(req, res, next) =>{
        await receiverStatusService.getAllReceiverStatus()
            .then(data => res.json(data))
            .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi', err)))
    }
    // [GET] /api/reciver/status/detail
    getReceiverStatusDetail = async(req, res, next) =>{
        await receiverStatusService.getReceiverStatusDetail(req.params.receive_status_id_pr)
            .then(data => res.json(data))
            .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi nhập receive_status_id_pr', err)));
    }
    
}

module.exports = new RecriverStatusController;