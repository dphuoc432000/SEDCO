const express = require('express');
const router = express.Router();
const multer = require("multer");
const uploadFile = require('../middlewares/upload');
const userController = require('../controllers/UserController.js');
const authmiddleware = require('../middlewares/auth');

// router.post('/store', userController.addUser); //OK // Đã có hàm regis
router.get('/list', userController.getAllUser); //OK
router.get('/email/detail', userController.getUserDetailByEmail)
router.get('/:id/detail', userController.getUserByID); //OK
//dùng phương thức POST để update
//có thể dùng phương thức PUT để đúng chuẩn RESTful
router.post('/:id/update',
            authmiddleware.check_login,
            authmiddleware.checkRole(['user','sender','receiver', 'car_trip']),
            uploadFile.uploadVehicleCensorship('uploads\\vehicle_censorship')
            .fields([
            {name: 'face_img', maxCount: 1},
            {name: 'id_card_img_before', maxCount: 1},
            {name: 'id_card_img_after', maxCount: 1},
            {name: 'driving_license_img_before', maxCount: 1},
            {name: 'driving_license_img_after', maxCount: 1},
            {name: 'test_img_1', maxCount: 1},
            {name: 'test_img_2', maxCount: 1}]),
            userController.updateUser); // trả về dữ liệu cũ //OK
//dùng phương thức POST để delete
//có thể dùng phương thức DELETE để đúng chuẩn RESTful
router.post('/:id/delete', userController.deleteUser); //OK
//Lấy tất cả user[driver] chưa được kiểm duyệt
router.get('/no_censorship/list', userController.getAllUserDriverNoCensorship); //OK //đã được pagination
module.exports = router;