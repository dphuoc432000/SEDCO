const senderStatusService = require('../service/SenderStatusService')
const handleOther = require('./handleOther');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const multer = require('multer');
const historySenderService = require('../service/HistorySenderService');

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
}

module.exports = new SenderStatusController();