const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/auth');
const uploadFile = require('../middlewares/upload');

const receiverStatusController = require('../controllers/ReceiverStatusController');

router.post('/create_receiver_status', authmiddleware.check_login, authmiddleware.check_user, uploadFile('uploads/receive_status').single('picture') ,receiverStatusController.addReceiverStatus);
router.post('/delete_receiver_status/:receive_status_id_pr', authmiddleware.check_login, authmiddleware.check_receiver,receiverStatusController.deleteReceiverStatus);
router.get('/status_list', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getAllReceiverStatusList);
router.get('/status/detail/:receive_status_id_pr', authmiddleware.check_login, authmiddleware.check_receiver, receiverStatusController.getReceiverStatusDetail);

module.exports = router;