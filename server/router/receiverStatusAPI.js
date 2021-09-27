const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');

const receiverStatusController = require('../controllers/ReceiverStatusController');

//thêm mới và xóa sẽ sử dụng api của status
router.get('/status_list', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getAllReceiverStatusList);
router.get('/status/detail/:receive_status_id_pr', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getReceiverStatusDetail);

module.exports = router;