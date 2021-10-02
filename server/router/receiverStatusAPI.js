const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');
const multer = require("multer");
const receiverStatusController = require('../controllers/ReceiverStatusController');

//thêm mới và xóa sẽ sử dụng api của status

//danh sách
router.get('/list', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getAllReceiverStatus);
//chi tiết
router.get('/:receiver_status_id_pr/detail', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getReceiverStatusDetail);
//cập nhật thông tin status
router.post('/:receiver_status_id_pr/update', authmiddleware.check_login, uploadFile.uploadFileStatus("uploads/status/RECEIVER").single("picture"), receiverStatusController.updateReceiverStatus);
module.exports = router;