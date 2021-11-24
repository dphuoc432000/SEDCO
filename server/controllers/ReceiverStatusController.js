const receiverStatusService = require('../service/ReceiverStatusService')
const handleOther = require('./handleOther');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const multer = require('multer');
const historyReceiverService = require('../service/HistoryReceiverService');
class RecriverStatusController {

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
    getAllReceiverStatus = async (req, res, next) => {
        await receiverStatusService.getAllReceiverStatus()
            .then(data => {
                if (data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi', null));
            })
            .catch(err => next(err));
    }

    // [GET] /api/receiver/:receiver_status_id_pr/detail
    getReceiverStatusDetail = async (req, res, next) => {
        await receiverStatusService.getReceiverStatusDetail(req.params.receiver_status_id_pr)
            .then(data => {
                if (data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập receiver_status_id', null));
            })
            .catch(err => next(err));
    }

    //[POST] /api/receiver/:receiver_status_id_pr/update
    updateReceiverStatus = async (req, res, next) => {
        const form_data = req.body;
        form_data.picture = req.file ? req.file.path : "";
        form_data.essentials = JSON.parse(form_data.essentials)
        await receiverStatusService.updateReceiverStatus(req.params.receiver_status_id_pr, req.body)
            .then(data => {
                if (data)
                    return res.json(data);
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập dữ liệu', null));
            })
            .catch(err => next(err));
    }

    //lấy tất cả danh sách chưa được xác nhận từ người dùng nhưng đã được xác nhận từ chuyến xe
    //Làm cho phần thông báo của receiver
    getAllHistoryRegisterReceiverNoConfirmByReceiverStatusID = async (req, res, next) => {
        await historyReceiverService.getAllHistoryRegisterReceiverNoConfirmByReceiverStatusID(req.params.receiver_status_id_pr, req.query._limit, req.query._page)
            .then(histories => {
                if (histories) {
                    return res.json(histories)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập receiver_status_id_pr', null));
            })
            .catch(err => next(err));
    }
    //Notification
    //Lấy ra những status vừa được chuyến xe đăng ký.
    //+ regis_status: true;
    //+ receiver_confirm: false;
    //+ car_confirm: false;
    getAllRegisterReceiverNoConfirm_0_2ByReceiverStatusID = async (req, res, next) => {
        await historyReceiverService.getAllRegisterReceiverNoConfirm_0_2ByReceiverStatusID(req.params.receiver_status_id_pr, req.query._limit, req.query._page)
            .then(histories => {
                if (histories) {
                    return res.json(histories)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập receiver_status_id_pr', null));
            })
            .catch(err => next(err));
    }
    confirmReceiverStatusOfReceiver = async(req, res, next) =>{
        await historyReceiverService.confirmReceiverStatusOfReceiver(req.params.car_status_id_pr, req.params.receiver_status_id_pr)
            .then(history =>{
                if (history) {
                    if(history === 'NO DATA')
                        return res.status(400).json(handleOther.errorHandling('Không tìm thấy data', null));
                    else if(history === 'NO CONFIRM')
                        return res.status(400).json(handleOther.errorHandling('Không thể xác nhận giao dịch', null));
                    else if(history === 'NO REGISTER')
                        return res.status(400).json(handleOther.errorHandling('Nguời nhận chưa được đăng ký', null));
                    return res.json(history)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập receiver_status_id_pr', null));
            })
    }
}

module.exports = new RecriverStatusController;