const receiverStatusService = require('../service/ReceiverStatusService')
const handleOther = require('./handleOther');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const multer = require('multer');

class RecriverStatusController{

    //[POST] /api/receiver/create_receiver_status
    // addReceiverStatus = async (req, res, next)=>{
    //     const account_id = authMiddleware.getAccIDByReqData(req, res, next);
    //     const form_data = req.body;
    //     form_data.picture = req.file.path;
    //     await receiverStatusService.addReceiverStatus(account_id, form_data)
    //         .then(data => res.json(data))
    //         .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi nhập', err)))
    //     // res.json(req.body);
    // }

    //[POST] /api/receiver/delete_receiver_status/:receiver_status_id_pr
    // deleteReceiverStatus = async(req, res, next) =>{
    //     await receiverStatusService.deleteReceiverStatus(req.params.receive_status_id_pr)
    //         .then(data => res.json(data))
    //         .catch(err => res.status(400).json(handleOther.errorHandling('Lỗi nhập receive_status_id_pr', err)));
    // }

    //[GET] /api/receiver/list
    getAllReceiverStatus = async(req, res, next) =>{
        await receiverStatusService.getAllReceiverStatus()
            .then(data => {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi', null));
            })
            .catch(err => next(err));
    }

    // [GET] /api/receiver/:receiver_status_id_pr/detail
    getReceiverStatusDetail = async(req, res, next) =>{
        await receiverStatusService.getReceiverStatusDetail(req.params.receiver_status_id_pr)
            .then(data => {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập receiver_status_id', null));
            })
            .catch(err => next(err));
    }
    
    //[POST] /api/receiver/:receiver_status_id_pr/update
    updateReceiverStatus = async(req, res, next) =>{
        const form_data = req.body;
        form_data.picture = req.file?req.file.path:"";
        await receiverStatusService.updateReceiverStatus(req.params.receiver_status_id_pr, req.body)
            .then(data =>  {
                if(data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập dữ liệu', null));
            })
            .catch(err => next(err));
    }
}

module.exports = new RecriverStatusController;