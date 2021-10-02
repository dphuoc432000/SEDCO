const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/upload');
const authmiddleware = require('../middlewares/auth');
const multer = require("multer");
const senderStatusController = require('../controllers/SenderStatusController');

//cập nhật
router.post('/:sender_status_id_pr/update', authmiddleware.check_login, uploadFile.uploadFileStatus("uploads/status/SENDER").single('picture'), senderStatusController.updateSenderStatus);
//chi tiết
router.get('/:sender_status_id_pr/detail', senderStatusController.getSenderStatusDetail);
//danh sách
router.get('/list', senderStatusController.getAllSenderStatus);

module.exports = router;