const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController.js');

// router.post('/store', userController.addUser); //OK // Đã có hàm regis
router.get('/list', userController.getAllUser); //OK
router.get('/:id/detail', userController.getUserByID); //OK
//dùng phương thức POST để update
//có thể dùng phương thức PUT để đúng chuẩn RESTful
router.post('/:id/update', userController.updateUser); // trả về dữ liệu cũ //OK
//dùng phương thức POST để delete
//có thể dùng phương thức DELETE để đúng chuẩn RESTful
router.post('/:id/delete', userController.deleteUser); //OK
module.exports = router;