const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/upload');
const authmiddleware = require('../middlewares/auth');
const multer = require("multer");
const carStatusController = require('../controllers/CarStatusController');
const statusController = require('../controllers/StatusController');

router.post('/:account_id_pr/create', 
                authmiddleware.check_login,
                authmiddleware.checkRole(['user']),
                uploadFile.uploadVehicleCensorship('uploads\\vehicle_censorship')
                .fields([{name: 'picture', maxCount: 1},
                        {name: 'face_img', maxCount: 1},
                        {name: 'id_card_img_before', maxCount: 1},
                        {name: 'id_card_img_after', maxCount: 1},
                        {name: 'driving_license_img_before', maxCount: 1},
                        {name: 'driving_license_img_after', maxCount: 1},
                        {name: 'test_img_1', maxCount: 1},
                        {name: 'test_img_2', maxCount: 1}]),
                // uploadFile.uploadFileStatus('uploads\\CAR_TRIP').single('picture'),
                statusController.addStatusCar); //OK
router.post('/:car_status_id_pr/update', authmiddleware.check_login ,authmiddleware.checkRole(['car_trip']), uploadFile.uploadFileStatus('uploads/status/CAR_TRIP').single('picture'), carStatusController.updateCarStatusInfor); //OK
router.post('/:car_status_id_pr/:sender_status_id_pr/register/sender', carStatusController.registerSenderStatus); //OK
router.post('/:car_status_id_pr/:receiver_status_id_pr/register/receiver', carStatusController.registerReceiverStatus); //OK
//Lấy ra những người đã được chuyến xe đăng ký nhưng chưa nhận nhu yếu phẩm(chưa click nut xác nhận)
//Điều kiện lọc:
//- Có data trong history_sender
//- Chưa được 2/2 confirm (confirm 0/2)
router.get('/:car_status_id_pr/register/sender/02/list', carStatusController.getAllRegisterSenderNoConfirm_0_2);//OK đã có pagination
//Lấy ra những người đã được chuyến xe đăng ký nhưng chưa gủi nhu yếu phẩm(chưa click nut xác nhận)
//Điều kiện lọc:
//- Có data trong history_receiver
//- Chưa được 2/2 confirm (confirm 0/2)
router.get('/:car_status_id_pr/register/receiver/02/list', carStatusController.getAllRegisterReceiverNoConfirm_0_2);//OK đã có pagination
module.exports = router;