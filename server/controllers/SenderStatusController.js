const senderStatusService = require('../service/SenderStatusService')
const handleOther = require('./handleOther');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const multer = require('multer');
const historySenderService = require('../service/HistorySenderService');
const SenderStatusService = require('../service/SenderStatusService');

class SenderStatusController {


    //[GET] /api/sender/list
    getAllSenderStatus = async (req, res, next) => {
        await senderStatusService.getAllSenderStatus()
            .then(data => {
                if (!data)
                    return res.status(400).json(handleOther.errorHandling('Lỗi', null));
                return res.json(data);
            })
            .catch(err => next(err));
    }
    //[GET] /api/sender/:sender_status_id_pr/detail 
    getSenderStatusDetail = async (req, res, next) => {
        await senderStatusService.getSenderStatusDetail(req.params.sender_status_id_pr)
            .then(data => {
                if (!data)
                    return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id', null));
                return res.json(data);
            })
            .catch(err => next(err));
    }

    //[POST] /api/sender/:sender_status_id_pr/update
    updateSenderStatus = async (req, res, next) => {
        const form_data = req.body;
        form_data.picture = req.file ? req.file.path : "";
        form_data.essentials = JSON.parse(form_data.essentials);
        await senderStatusService.updateSenderStatus(req.params.sender_status_id_pr, req.body)
            .then(data => {
                if (!data)
                    return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id', null));
                return res.json(data);
            })
            .catch(err => next(err));
    }

    //lấy tất cả danh sách chưa được xác nhận từ người dùng nhưng đã được xác nhận từ chuyến xe
    //Làm cho phần thông báo của receiver
    getAllHistoryRegisterSenderNoConfirmBySenderStatusID = async (req, res, next) => {
        await historySenderService.getAllHistoryRegisterSenderNoConfirmBySenderStatusID(req.params.sender_status_id_pr, req.query._limit, req.query._page)
            .then(histories => {
                if (histories) {
                    return res.json(histories)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id_pr', null));
            })
            .catch(err => next(err));
    }

    getAllRegisterSenderNoConfirm_0_2BySenderStatusID = async (req, res, next) => {
        await historySenderService.getAllRegisterSenderNoConfirm_0_2BySenderStatusID(req.params.sender_status_id_pr, req.query._limit, req.query._page)
            .then(histories => {
                if (histories) {
                    return res.json(histories)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id_pr', null));
            })
            .catch(err => next(err));
    }
    getAllHistoryRegisterSenderConfirmBySenderStatusID = async (req, res, next) => {
        await historySenderService.getAllHistoryRegisterSenderConfirmBySenderStatusID(req.params.sender_status_id_pr, req.query._limit, req.query._page)
            .then(histories => {
                if (histories) {
                    return res.json(histories)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id_pr', null));
            })
            .catch(err => next(err));
    }

    confirmSenderStatusOfSender = async(req, res, next) =>{
        await historySenderService.confirmSenderStatusOfSender(req.params.car_status_id_pr, req.params.sender_status_id_pr)
            .then(history =>{
                if (history) {
                    if(history === 'NO DATA')
                        return res.status(400).json(handleOther.errorHandling('Không tìm thấy data', null));
                    else if(history === 'NO CONFIRM')
                        return res.status(400).json(handleOther.errorHandling('Không thể xác nhận giao dịch', null));
                    else if(history === 'NO REGISTER')
                        return res.status(400).json(handleOther.errorHandling('Nguời hỗ trợ chưa được đăng ký', null));
                    return res.json(history)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id_pr', null));
            })
    }

    completeSenderStatus = async(req, res, next) =>{
        await SenderStatusService.completeSenderStatus(req.params.sender_status_id_pr)
            .then(data =>{
                if(data){
                    if(data === 'TRADING')
                        return res.status(400).json(handleOther.errorHandling('Đang trong quá trình giao dịch', null));
                    return res.json(data)
                }
                return res.status(400).json(handleOther.errorHandling('Lỗi nhập sender_status_id_pr', null));
            })
    }
}

module.exports = new SenderStatusController();