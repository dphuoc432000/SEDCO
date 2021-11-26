const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');
const multer = require("multer");
const receiverStatusController = require('../controllers/ReceiverStatusController');
const statusController = require('../controllers/StatusController')
//thêm mới và xóa sẽ sử dụng api của status

//thêm receiver status
router.post('/:account_id_pr/create', authmiddleware.check_login, authmiddleware.checkRole(['user']), uploadFile.uploadFileStatus('uploads/status/RECEIVER').single('picture'), statusController.addStatusReceiver);//OK
//danh sách
router.get('/list', authmiddleware.check_login, receiverStatusController.getAllReceiverStatus);
//chi tiết
router.get('/:receiver_status_id_pr/detail', authmiddleware.check_login, receiverStatusController.getReceiverStatusDetail);
//cập nhật thông tin status
router.post('/:receiver_status_id_pr/update', authmiddleware.check_login, uploadFile.uploadFileStatus("uploads/status/RECEIVER").single("picture"), receiverStatusController.updateReceiverStatus);
router.get('/:receiver_status_id_pr/history/no_confirm/car_confirm/list', receiverStatusController.getAllHistoryRegisterReceiverNoConfirmByReceiverStatusID);
router.post('/:car_status_id_pr/:receiver_status_id_pr/confirm/receiver/receiver', receiverStatusController.confirmReceiverStatusOfReceiver);
router.get('/:receiver_status_id_pr/history/no_confirm/list', receiverStatusController.getAllRegisterReceiverNoConfirm_0_2ByReceiverStatusID);
router.get('/:receiver_status_id_pr/history/confirm/list', receiverStatusController.getAllHistoryRegisterReceiverConfirmByReceiverStatusID);
module.exports = router;