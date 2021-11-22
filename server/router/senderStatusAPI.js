const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/upload');
const authmiddleware = require('../middlewares/auth');
const multer = require("multer");
const senderStatusController = require('../controllers/SenderStatusController');
const statusController = require('../controllers/StatusController');

//thêm sender status
router.post('/:account_id_pr/create', authmiddleware.check_login, authmiddleware.checkRole(['user']), uploadFile.uploadFileStatus('uploads/status/SENDER').single('picture'), statusController.addStatusSender);//OK
//cập nhật
router.post('/:sender_status_id_pr/update', authmiddleware.check_login, uploadFile.uploadFileStatus("uploads/status/SENDER").single('picture'), senderStatusController.updateSenderStatus);
//chi tiết
router.get('/:sender_status_id_pr/detail', senderStatusController.getSenderStatusDetail);
//danh sách
router.get('/list', senderStatusController.getAllSenderStatus);
router.get('/:sender_status_id_pr/history/no_confirm/list', senderStatusController.getAllHistoryRegisterSenderNoConfirmBySenderStatusID);
module.exports = router;